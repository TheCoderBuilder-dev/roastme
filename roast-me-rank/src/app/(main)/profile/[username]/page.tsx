import React from 'react';
import { ProfileHeader } from '@/components/ProfileHeader';
import { RoastSubmission } from '@/components/RoastSubmission';
import { RoastCard } from '@/components/RoastCard';
import { User, RoastWithUser } from '@/lib/types';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Award, Flag, MessageSquare, Share2 } from 'lucide-react';

// This would be a server component in a real app
// We'd fetch data from Supabase here
export default function ProfilePage({ params }: { params: { username: string } }) {
  const { username } = params;
  
  // For demonstration, we'll create mock data
  // In a real app, this would be fetched from the database
  const mockUser: User = {
    id: '6',
    username: username,
    email: 'user@example.com',
    bio: 'Just a regular person looking to get roasted 🔥',
    avatarUrl: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
    level: 18,
    xp: 2500,
    isPrivate: false,
    filterModeEnabled: true,
    approveRoastsFirst: false,
  };
  
  const mockRoasts: RoastWithUser[] = [
    {
      id: '101',
      content: "Your selfie looks like it was taken by a potato that was dropped in a puddle and then microwaved for 30 seconds.",
      userId: '1',
      targetUserId: mockUser.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      upvotes: 128,
      downvotes: 12,
      isHidden: false,
      isFlagged: false,
      user: {
        username: 'RoastKing',
        avatarUrl: null,
        level: 32
      }
    },
    {
      id: '102',
      content: "If 'mid' was a person, it would be you.",
      userId: '2',
      targetUserId: mockUser.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      upvotes: 87,
      downvotes: 5,
      isHidden: false,
      isFlagged: false,
      user: {
        username: 'BurnMaster',
        avatarUrl: null,
        level: 28
      }
    },
    {
      id: '103',
      content: "Your bio is like a plain yogurt - trying to be healthy but ultimately just bland and forgettable.",
      userId: '3',
      targetUserId: mockUser.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      upvotes: 65,
      downvotes: 8,
      isHidden: false,
      isFlagged: false,
      user: {
        username: 'FlameQueen',
        avatarUrl: null,
        level: 25
      }
    },
  ];
  
  const mockAchievements = [
    {
      id: '1',
      title: 'First Blood',
      description: 'Survived your first roast',
      iconUrl: '🩸',
      unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28).toISOString(),
    },
    {
      id: '2',
      title: 'Thick Skin',
      description: 'Received 10 roasts without deleting your account',
      iconUrl: '🛡️',
      unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    },
    {
      id: '3',
      title: 'Roast Rookie',
      description: 'Reached Level 10',
      iconUrl: '🔥',
      unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    },
  ];
  
  // Check if user exists - in a real app, this would be a database check
  if (!mockUser) {
    notFound();
  }
  
  // Handlers for user interactions
  const handleSubmitRoast = async (content: string) => {
    console.log('Submitted roast:', content);
    // This would call an API to add the roast
  };
  
  const handleUpvote = (roastId: string) => {
    console.log('Upvote roast:', roastId);
  };
  
  const handleDownvote = (roastId: string) => {
    console.log('Downvote roast:', roastId);
  };
  
  const handleReply = (roastId: string) => {
    console.log('Reply to roast:', roastId);
  };
  
  const handleReport = (roastId: string) => {
    console.log('Report roast:', roastId);
  };
  
  const handleShare = (roastId: string) => {
    console.log('Share roast:', roastId);
  };
  
  const handleEditProfile = () => {
    console.log('Edit profile');
  };
  
  const handleShareProfile = () => {
    console.log('Share profile');
  };
  
  const handleReportProfile = () => {
    console.log('Report profile');
  };
  
  // Mock current user - in a real app, this would come from auth state
  const currentUser = {
    id: '1',
    username: 'RoastKing',
    avatarUrl: null,
  };
  
  const isCurrentUser = currentUser.id === mockUser.id;

  return (
    <div>
      <ProfileHeader 
        user={mockUser}
        isCurrentUser={isCurrentUser}
        onEditProfile={handleEditProfile}
        onShare={handleShareProfile}
        onReport={handleReportProfile}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column - User info & stats */}
        <div className="md:col-span-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">About</h2>
            
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member since</h3>
                <p>{formatDate(mockUser.createdAt)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Roasts received</h3>
                <p>{mockRoasts.length}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Roast rank</h3>
                <p>#{Math.floor(Math.random() * 1000) + 1}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Achievements</h2>
              <Button variant="ghost" size="sm" className="text-orange-500">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {mockAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.iconUrl}</div>
                  <div className="flex-1">
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Share this profile</h2>
            
            <div className="flex gap-2 mb-4">
              <Button variant="outline" size="sm" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Generate Meme
              </Button>
            </div>
            
            <p className="text-sm text-gray-500">
              Share this profile to get more roasts and climb the ranks faster!
            </p>
          </div>
        </div>
        
        {/* Right Column - Roasts */}
        <div className="md:col-span-8">
          {/* Roast submission form */}
          {!isCurrentUser && (
            <RoastSubmission 
              targetUsername={mockUser.username}
              currentUser={currentUser}
              onSubmit={handleSubmitRoast}
              isAnonymous={false}
              setIsAnonymous={(value) => console.log('Set anonymous:', value)}
            />
          )}
          
          {/* Tabs for different content */}
          <Tabs defaultValue="roasts" className="mb-6">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="roasts" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                Roasts
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                Stats
              </TabsTrigger>
              <TabsTrigger value="best" className="flex items-center gap-1">
                <Flag className="h-4 w-4" />
                Best Roasts
              </TabsTrigger>
            </TabsList>
            
            {/* Roasts Tab Content */}
            <TabsContent value="roasts">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">
                  Recent Roasts
                </h2>
                
                <div className="space-y-4">
                  {mockRoasts.map((roast) => (
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
                  
                  {mockRoasts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-20" />
                      <p>No roasts yet. Be the first to roast {mockUser.username}!</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Stats Tab Content */}
            <TabsContent value="stats">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Roast Statistics</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Roasts</h3>
                    <p className="text-3xl font-bold">{mockRoasts.length}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      {formatDate(mockUser.createdAt)}
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Upvotes</h3>
                    <p className="text-3xl font-bold text-orange-500">
                      {mockRoasts.reduce((acc, roast) => acc + roast.upvotes, 0)}
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      From {mockRoasts.length} roasts
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Best Roast</h3>
                    <p className="text-xl font-semibold truncate">
                      {mockRoasts.length > 0
                        ? mockRoasts.sort((a, b) => b.upvotes - a.upvotes)[0].upvotes + ' upvotes'
                        : 'No roasts yet'}
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      {mockRoasts.length > 0
                        ? formatDate(mockRoasts.sort((a, b) => b.upvotes - a.upvotes)[0].createdAt)
                        : ''}
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Roast Ratio</h3>
                    <p className="text-3xl font-bold text-green-500">
                      {mockRoasts.reduce((acc, roast) => acc + roast.upvotes, 0) === 0 ? '0%' :
                        Math.round(
                          (mockRoasts.reduce((acc, roast) => acc + roast.upvotes, 0) /
                            (mockRoasts.reduce((acc, roast) => acc + roast.upvotes, 0) +
                              mockRoasts.reduce((acc, roast) => acc + roast.downvotes, 0))) *
                            100
                        ) + '%'}
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      Upvotes vs Downvotes
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Best Roasts Tab Content */}
            <TabsContent value="best">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">
                  Best Roasts
                </h2>
                
                <div className="space-y-4">
                  {mockRoasts
                    .sort((a, b) => b.upvotes - a.upvotes)
                    .map((roast) => (
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
                    
                  {mockRoasts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-20" />
                      <p>No roasts yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
