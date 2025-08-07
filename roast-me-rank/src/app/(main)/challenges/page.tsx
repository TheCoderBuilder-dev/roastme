'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, AlarmClock, Lock, CheckCircle2 } from 'lucide-react';
import { useSupabase } from '@/context/SupabaseProvider';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import { useToast } from '@/components/ui/use-toast';

type Challenge = {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
  start_date: string;
  end_date: string;
  is_completed?: boolean;
  completed_at?: string;
  requirements: string;
};

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userChallenges, setUserChallenges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSupabase();
  const { toast } = useToast();
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    if (user) {
      fetchChallenges();
    }
  }, [user]);

  const fetchChallenges = async () => {
    setIsLoading(true);
    try {
      // In a real app, you'd fetch actual challenges from your database
      // This is a placeholder for mock challenges
      const mockChallenges: Challenge[] = [
        {
          id: 'weekly-roast-1',
          title: 'Weekly Roast Challenge',
          description: 'Submit 5 roasts this week to earn bonus XP!',
          xp_reward: 150,
          start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          end_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
          requirements: 'Submit 5 roasts before the deadline'
        },
        {
          id: 'upvote-champion',
          title: 'Upvote Champion',
          description: 'Get 10 upvotes on a single roast',
          xp_reward: 200,
          start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          requirements: 'Have at least one roast with 10+ upvotes'
        },
        {
          id: 'daily-roaster',
          title: 'Daily Roaster',
          description: 'Post at least one roast every day for 5 days',
          xp_reward: 250,
          start_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          end_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
          requirements: 'Post 1 roast per day for 5 consecutive days'
        },
        {
          id: 'community-engagement',
          title: 'Community Engagement',
          description: 'Vote on 20 roasts from other users',
          xp_reward: 100,
          start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
          requirements: 'Vote (up or down) on 20 different roasts'
        },
        {
          id: 'roast-battle-winner',
          title: 'Roast Battle Winner',
          description: 'Win a roast battle against another user',
          xp_reward: 300,
          start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
          end_date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days from now
          requirements: 'Win a roast battle by getting more upvotes than your opponent'
        }
      ];

      // Fetch user completed challenges (in a real app)
      // const { data: userCompletedChallenges, error } = await supabase
      //   .from('user_challenges')
      //   .select('challenge_id, completed_at')
      //   .eq('user_id', user.id);

      // Mock completed challenges
      const mockCompletedChallenges = ['daily-roaster'];

      // Mark challenges as completed if the user has completed them
      const challengesWithCompletionStatus = mockChallenges.map(challenge => ({
        ...challenge,
        is_completed: mockCompletedChallenges.includes(challenge.id),
        completed_at: mockCompletedChallenges.includes(challenge.id)
          ? new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
          : undefined
      }));

      setChallenges(challengesWithCompletionStatus);
      setUserChallenges(mockCompletedChallenges);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      toast({
        title: 'Error',
        description: 'Failed to load challenges',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRemainingDays = (endDateStr: string) => {
    const endDate = new Date(endDateStr);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl mr-4 shadow-md transform rotate-3">
          <Trophy className="h-7 w-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Challenges</h1>
          <p className="text-gray-600">Complete challenges to earn XP and climb the leaderboards</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-t-2 border-orange-500 rounded-full"></div>
        </div>
      ) : challenges.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Trophy className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium">No active challenges</h3>
            <p className="text-gray-500 mt-2">
              Check back soon for new challenges to earn XP and rewards!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {challenges.map((challenge) => {
            const daysRemaining = getRemainingDays(challenge.end_date);
            const isExpired = daysRemaining <= 0;
            
            return (
              <Card 
                key={challenge.id} 
                className={`overflow-hidden ${challenge.is_completed ? 'border-green-200' : isExpired ? 'border-gray-200 opacity-70' : 'border-orange-200'}`}
              >
                {challenge.is_completed && (
                  <div className="bg-green-500 text-white text-center text-xs py-1 font-medium">
                    COMPLETED
                  </div>
                )}
                {isExpired && !challenge.is_completed && (
                  <div className="bg-gray-500 text-white text-center text-xs py-1 font-medium">
                    EXPIRED
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {challenge.title}
                        {challenge.is_completed && (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                        {isExpired && !challenge.is_completed && (
                          <Lock className="h-5 w-5 text-gray-400" />
                        )}
                      </CardTitle>
                      <CardDescription>{challenge.description}</CardDescription>
                    </div>
                    <div className="bg-orange-100 px-3 py-1 rounded-md text-orange-700 font-medium">
                      +{challenge.xp_reward} XP
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-700">
                      <strong>Requirements:</strong> {challenge.requirements}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(challenge.start_date)} - {formatDate(challenge.end_date)}</span>
                      </div>
                      
                      {!isExpired && !challenge.is_completed && (
                        <div className="flex items-center gap-2 text-sm font-medium text-orange-600">
                          <AlarmClock className="h-4 w-4" />
                          <span>{daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining</span>
                        </div>
                      )}
                      
                      {challenge.is_completed && (
                        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                          <span>Completed on {formatDate(challenge.completed_at || '')}</span>
                        </div>
                      )}
                    </div>
                    
                    {!challenge.is_completed && !isExpired && (
                      <Button variant="fire" className="w-full sm:w-auto">View Details</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
