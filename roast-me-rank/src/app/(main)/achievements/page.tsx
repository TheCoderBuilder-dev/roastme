'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Trophy, Lock, Award, Star, Flame, ThumbsUp, Medal, Zap } from 'lucide-react';
import { useSupabase } from '@/context/SupabaseProvider';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import { useToast } from '@/components/ui/use-toast';

type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  xp_reward: number;
  is_unlocked?: boolean;
  unlocked_at?: string;
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSupabase();
  const { toast } = useToast();
  const supabase = createBrowserSupabaseClient();

  // Define all possible achievements
  const allAchievements: Achievement[] = [
    {
      id: 'first-roast',
      name: 'First Burn',
      description: 'Post your first roast',
      icon: 'flame',
      requirement: 'Submit 1 roast',
      xp_reward: 50
    },
    {
      id: 'roast-master',
      name: 'Roast Master',
      description: 'Post 10 roasts',
      icon: 'fire',
      requirement: 'Submit 10 roasts',
      xp_reward: 100
    },
    {
      id: 'hot-streak',
      name: 'Hot Streak',
      description: 'Get 5 roasts with 10+ upvotes',
      icon: 'zap',
      requirement: '5 roasts with 10+ upvotes',
      xp_reward: 200
    },
    {
      id: 'crowd-pleaser',
      name: 'Crowd Pleaser',
      description: 'Receive 100 total upvotes',
      icon: 'thumbs-up',
      requirement: '100 total upvotes',
      xp_reward: 250
    },
    {
      id: 'level-5',
      name: 'Rising Star',
      description: 'Reach level 5',
      icon: 'star',
      requirement: 'Reach level 5',
      xp_reward: 300
    },
    {
      id: 'level-10',
      name: 'Comedy Legend',
      description: 'Reach level 10',
      icon: 'award',
      requirement: 'Reach level 10',
      xp_reward: 500
    },
    {
      id: 'top-weekly',
      name: 'Weekly Champion',
      description: 'Get to the top of the weekly leaderboard',
      icon: 'medal',
      requirement: '#1 on weekly leaderboard',
      xp_reward: 400
    },
    {
      id: 'roast-battle-winner',
      name: 'Battle Winner',
      description: 'Win a roast battle',
      icon: 'trophy',
      requirement: 'Win 1 roast battle',
      xp_reward: 350
    }
  ];

  useEffect(() => {
    if (user) {
      fetchUserAchievements();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchUserAchievements = async () => {
    setIsLoading(true);
    try {
      // This would be a real API call in a complete implementation
      const { data, error } = await supabase
        .from('achievements')
        .select('achievement_id, unlocked_at')
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }

      // Map the user's achievements to a list of achievement IDs
      const unlockedAchievementIds = data?.map(item => item.achievement_id) || [];
      setUserAchievements(unlockedAchievementIds);

      // For demonstration purposes, let's unlock some achievements
      // In a real app, this logic would be handled server-side
      if (unlockedAchievementIds.length === 0) {
        // Simulate having some achievements for better UI experience
        setUserAchievements(['first-roast', 'level-5']);
      }

    } catch (error) {
      console.error('Error fetching achievements:', error);
      toast({
        title: 'Error',
        description: 'Failed to load achievements',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render achievement icon based on the icon name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy className="h-10 w-10 text-yellow-500" />;
      case 'star':
        return <Star className="h-10 w-10 text-yellow-500" />;
      case 'flame':
        return <Flame className="h-10 w-10 text-orange-500" />;
      case 'fire':
        return <Flame className="h-10 w-10 text-orange-600" />;
      case 'thumbs-up':
        return <ThumbsUp className="h-10 w-10 text-blue-500" />;
      case 'medal':
        return <Medal className="h-10 w-10 text-yellow-600" />;
      case 'award':
        return <Award className="h-10 w-10 text-purple-500" />;
      case 'zap':
        return <Zap className="h-10 w-10 text-amber-500" />;
      default:
        return <Award className="h-10 w-10 text-gray-500" />;
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center mb-8">
        <Trophy className="mr-2 h-6 w-6" />
        <h1 className="text-3xl font-bold">Achievements</h1>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-t-2 border-orange-500 rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allAchievements.map((achievement) => {
            const isUnlocked = userAchievements.includes(achievement.id);
            
            return (
              <Card 
                key={achievement.id} 
                className={`transition ${isUnlocked ? 'border-orange-400' : 'opacity-80'}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className={`p-3 rounded-lg mr-4 ${isUnlocked ? 'bg-orange-100' : 'bg-gray-100'}`}>
                      {isUnlocked ? (
                        renderIcon(achievement.icon)
                      ) : (
                        <Lock className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{achievement.name}</h3>
                      <p className="text-gray-700 mb-2">{achievement.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {achievement.requirement}
                        </span>
                        <span className="text-sm font-medium text-orange-600">
                          +{achievement.xp_reward} XP
                        </span>
                      </div>
                      {isUnlocked && (
                        <div className="mt-2 text-sm text-green-600 font-medium flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          Unlocked
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      
      <div className="mt-8 p-4 bg-orange-50 rounded-lg">
        <h2 className="text-lg font-medium mb-2 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-orange-500" />
          How to earn achievements
        </h2>
        <p className="text-gray-700">
          Achievements are unlocked by participating in the RoastMe community. Post roasts, receive upvotes, reach new levels,
          and compete in roast battles to earn achievements and gain bonus XP!
        </p>
      </div>
    </div>
  );
}
