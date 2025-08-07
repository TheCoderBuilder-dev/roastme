'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProfileHeader } from '@/components/ProfileHeader';
import { RoastSubmission } from '@/components/RoastSubmission';
import { RoastCard } from '@/components/RoastCard';
import { User, RoastWithUser } from '@/lib/types';
import { Shuffle, Users, ArrowRight, ArrowLeft, MessageSquare, Sparkles, AlarmClock } from 'lucide-react';
import { getRandomUsers, getRoastsForUser, createRoast, voteOnRoast, getUserVote } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [roasts, setRoasts] = useState<Record<string, RoastWithUser[]>>({});
  const [userVotes, setUserVotes] = useState<Record<string, 'upvote' | 'downvote' | null>>({});
  const { toast } = useToast();
  
  // Make sure currentProfile is never undefined
  const currentProfile = profiles.length > 0 ? profiles[currentIndex] : null;

  // Fetch random profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      try {
        const users = await getRandomUsers(10);
        if (users.length > 0) {
          setProfiles(users);
          // Pre-fetch roasts for the first profile
          const profileRoasts = await getRoastsForUser(users[0].id);
          setRoasts(prev => ({
            ...prev,
            [users[0].id]: profileRoasts
          }));
          
          // Get user votes for these roasts
          const votes: Record<string, 'upvote' | 'downvote' | null> = {};
          for (const roast of profileRoasts) {
            const vote = await getUserVote(roast.id);
            votes[roast.id] = vote;
          }
          setUserVotes(votes);
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profiles. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfiles();
  }, [toast]);
  
  // Fetch roasts when currentIndex changes
  useEffect(() => {
    if (!profiles.length || !currentProfile) return;
    
    const fetchRoastsForCurrentProfile = async () => {
      // Only fetch if we don't already have them
      if (!roasts[currentProfile.id]) {
        try {
          const profileRoasts = await getRoastsForUser(currentProfile.id);
          setRoasts(prev => ({
            ...prev,
            [currentProfile.id]: profileRoasts
          }));
          
          // Get user votes for these roasts
          const votes: Record<string, 'upvote' | 'downvote' | null> = {...userVotes};
          for (const roast of profileRoasts) {
            const vote = await getUserVote(roast.id);
            votes[roast.id] = vote;
          }
          setUserVotes(votes);
        } catch (error) {
          console.error('Error fetching roasts:', error);
        }
      }
    };
    
    fetchRoastsForCurrentProfile();
  }, [currentProfile, profiles, roasts, userVotes]);
  
  const currentProfileRoasts = currentProfile ? (roasts[currentProfile.id] || []) : [];
  
    const handleSubmitRoast = async (content: string) => {
    if (!currentProfile) {
      toast({
        title: 'Error',
        description: 'No user profile selected to roast',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Store the ID to avoid null checks later
      const profileId = currentProfile.id;
      const roast = await createRoast(content, profileId);
      
      if (roast) {
        // Refresh roasts for this user
        const updatedRoasts = await getRoastsForUser(profileId);
        setRoasts(prev => ({
          ...prev,
          [profileId]: updatedRoasts
        }));
        
        setHasSubmitted(true);
        toast({
          title: 'Roast submitted',
          description: 'Your roast has been published successfully!',
        });
      }
    } catch (error) {
      console.error('Error submitting roast:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit your roast. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpvote = async (roastId: string) => {
    if (!currentProfile) {
      toast({
        title: 'Error',
        description: 'No user profile selected',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const currentVote = userVotes[roastId];
      const success = await voteOnRoast(roastId, 'upvote');
      if (success) {
        // Update the local vote state
        setUserVotes(prev => ({
          ...prev,
          [roastId]: prev[roastId] === 'upvote' ? null : 'upvote'
        }));
        
        // Refresh roasts for this user
        const profileId = currentProfile.id;
        const updatedRoasts = await getRoastsForUser(profileId);
        setRoasts(prev => ({
          ...prev,
          [profileId]: updatedRoasts
        }));
        
        toast({
          title: 'Vote recorded',
          description: currentVote === 'upvote' 
            ? 'Your upvote has been removed' 
            : 'Your upvote has been recorded',
        });
      }
    } catch (error) {
      console.error('Error upvoting:', error);
      toast({
        title: 'Error',
        description: 'Failed to record your vote. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const handleDownvote = async (roastId: string) => {
    if (!currentProfile) {
      toast({
        title: 'Error',
        description: 'No user profile selected',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const currentVote = userVotes[roastId];
      const success = await voteOnRoast(roastId, 'downvote');
      if (success) {
        // Update the local vote state
        setUserVotes(prev => ({
          ...prev,
          [roastId]: prev[roastId] === 'downvote' ? null : 'downvote'
        }));
        
        // Refresh roasts for this user
        const profileId = currentProfile.id;
        const updatedRoasts = await getRoastsForUser(profileId);
        setRoasts(prev => ({
          ...prev,
          [profileId]: updatedRoasts
        }));
        
        toast({
          title: 'Vote recorded',
          description: currentVote === 'downvote' 
            ? 'Your downvote has been removed' 
            : 'Your downvote has been recorded',
        });
      }
    } catch (error) {
      console.error('Error downvoting:', error);
      toast({
        title: 'Error',
        description: 'Failed to record your vote. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const handleReply = (roastId: string) => {
    toast({
      title: 'Coming soon',
      description: 'Replies to roasts will be available in the next update!',
    });
  };
  
  const handleReport = (roastId: string) => {
    toast({
      title: 'Report submitted',
      description: 'Thank you for reporting this roast. Our moderators will review it.',
    });
  };
  
  const handleShare = (roastId: string) => {
    // Copy share URL to clipboard
    const shareUrl = `${window.location.origin}/roast/${roastId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: 'Link copied',
      description: 'Share link has been copied to your clipboard!',
    });
  };
  
  const handleNext = () => {
    if (profiles.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    setHasSubmitted(false);
  };
  
  const handlePrevious = () => {
    if (profiles.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? profiles.length - 1 : prevIndex - 1));
    setHasSubmitted(false);
  };
  
  const handleRandom = () => {
    if (profiles.length <= 1) return;
    
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * profiles.length);
    } while (newIndex === currentIndex);
    
    setCurrentIndex(newIndex);
    setHasSubmitted(false);
  };

  const currentUser = {
    id: 'current-user',
    username: 'YourUsername',
    avatarUrl: undefined,
  };

  // Show loading state while fetching profiles
  if (isLoading && profiles.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-center items-center min-h-[60vh] flex-col">
        <div className="w-16 h-16 border-4 border-orange-300 border-t-orange-500 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading profiles...</h2>
        <p className="text-gray-500 mt-2">Please wait while we find people to roast</p>
      </div>
    );
  }
  
  // Show error state if no profiles found
  if (!isLoading && profiles.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-center items-center min-h-[60vh] flex-col">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <Users className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700">No profiles found</h2>
        <p className="text-gray-500 mt-2 mb-6">Try refreshing the page</p>
        <Button onClick={() => window.location.reload()} className="bg-orange-500 hover:bg-orange-600 text-white">Refresh Page</Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="relative mb-8">
        <div className="absolute -top-10 right-10 h-32 w-32 rounded-full bg-orange-100 opacity-30 blur-2xl" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg transform rotate-3 inline-block shadow-md">
                <Users className="h-5 w-5 text-white" />
              </span>
              Discover Roastable People
            </h1>
            <p className="text-gray-600">Browse people asking to be roasted and show off your wit</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handlePrevious} variant="outline" className="border-gray-200 rounded-xl hover:bg-gray-50 px-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button onClick={handleRandom} variant="outline" className="border-gray-200 rounded-xl hover:bg-gray-50 px-4">
              <Shuffle className="h-4 w-4 mr-2" />
              Random
            </Button>
            <Button onClick={handleNext} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="flex overflow-x-auto gap-4 pb-4 mb-4">
          <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full text-orange-700 text-sm font-medium whitespace-nowrap">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Popular Now</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full text-gray-700 text-sm font-medium whitespace-nowrap">
            <AlarmClock className="h-3.5 w-3.5" />
            <span>Recently Added</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full text-gray-700 text-sm font-medium whitespace-nowrap">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Needs Roasts</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-3xl font-bold p-1">
              <div className="bg-white w-full h-full rounded-lg flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-500">
                  {currentProfile ? currentProfile.username.slice(0, 2).toUpperCase() : 'NA'}
                </span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                <h2 className="text-2xl font-bold text-gray-900">{currentProfile ? currentProfile.username : 'Loading...'}</h2>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-orange-100 rounded-md text-orange-700 text-xs font-medium">
                    Level {currentProfile ? currentProfile.level : '0'}
                  </div>
                  <div className="px-2 py-1 bg-blue-100 rounded-md text-blue-700 text-xs font-medium">
                    {currentProfile ? currentProfile.xp : '0'} XP
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 text-lg">"{currentProfile && currentProfile.bio ? currentProfile.bio : 'No bio available'}"</p>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                  Share Profile
                </Button>
                <Button variant="outline" className="border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                  Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 order-2 md:order-1">
          {!hasSubmitted ? (
            <RoastSubmission 
              targetUsername={currentProfile ? currentProfile.username : ''}
              currentUser={currentUser}
              onSubmit={handleSubmitRoast}
              isAnonymous={false}
              setIsAnonymous={(value) => console.log('Set anonymous:', value)}
            />
          ) : (
            <div className="bg-white border border-green-200 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-green-700 mb-4">
                Roast Submitted Successfully!
              </h2>
              <p className="text-gray-700 mb-4">
                Your roast has been submitted and {currentProfile ? currentProfile.username : 'they'} will feel the burn! 🔥
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleRandom}>
                  <Shuffle className="h-4 w-4 mr-2" />
                  Find Someone Else
                </Button>
                <Button onClick={handleNext}>
                  Next Person
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="md:col-span-7 order-1 md:order-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-orange-500" />
                Roasts for {currentProfile ? currentProfile.username : 'user'}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="text-sm border-gray-200 rounded-lg text-gray-700 py-1 pr-8 pl-3">
                  <option>Top</option>
                  <option>New</option>
                  <option>Controversial</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {currentProfileRoasts.map((roast: RoastWithUser) => (
                <RoastCard
                  key={roast.id}
                  roast={roast}
                  onUpvote={handleUpvote}
                  onDownvote={handleDownvote}
                  onReply={handleReply}
                  onReport={handleReport}
                  onShare={handleShare}
                />
              ))}
              
              {currentProfileRoasts.length === 0 && (
                <div className="text-center py-12 px-6">
                  <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No roasts yet!</h3>
                  <p className="text-gray-500 text-sm mb-6">Be the first to roast {currentProfile ? currentProfile.username : 'this user'} and earn bonus XP!</p>
                  <div className="inline-block bg-gradient-to-r from-orange-400/10 to-red-400/10 px-3 py-1 rounded-full">
                    <span className="text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                      + 50 XP First Roaster Bonus
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}