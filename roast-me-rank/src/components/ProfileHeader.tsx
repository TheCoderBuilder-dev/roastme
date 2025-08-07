import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/types';
import { Share2, Shield, Settings } from 'lucide-react';
import { calculateXpForNextLevel } from '@/lib/utils';

interface ProfileHeaderProps {
  user: User;
  isCurrentUser: boolean;
  onEditProfile?: () => void;
  onShare?: () => void;
  onReport?: () => void;
}

export function ProfileHeader({
  user,
  isCurrentUser,
  onEditProfile,
  onShare,
  onReport,
}: ProfileHeaderProps) {
  // Calculate progress to next level
  const currentXp = user.xp;
  const nextLevelXp = calculateXpForNextLevel(user.level + 1);
  const prevLevelXp = calculateXpForNextLevel(user.level);
  const xpRange = nextLevelXp - prevLevelXp;
  const progress = Math.min(((currentXp - prevLevelXp) / xpRange) * 100, 100);

  // Get initials for avatar fallback
  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <div className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="h-24 w-24 border-4 border-white">
          <AvatarImage src={user.avatarUrl} alt={user.username} />
          <AvatarFallback className="text-2xl bg-orange-300 text-orange-800">
            {getInitials(user.username)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold mb-1">{user.username}</h1>
          
          {user.bio && (
            <p className="text-orange-100 mb-2">{user.bio}</p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <div className="flex items-center gap-2">
              <span className="bg-orange-700 text-orange-100 px-2 py-1 rounded text-xs">
                Level {user.level}
              </span>
              
              {user.isPrivate && (
                <span className="bg-orange-700 text-orange-100 px-2 py-1 rounded text-xs">
                  Private
                </span>
              )}
            </div>
            
            <div className="flex-1 h-2 bg-orange-700 rounded-full max-w-xs">
              <div 
                className="h-2 bg-yellow-400 rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <span className="text-xs">{Math.floor(currentXp - prevLevelXp)}/{Math.floor(xpRange)} XP</span>
          </div>
        </div>
        
        <div className="flex flex-row md:flex-col gap-2">
          {isCurrentUser ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onEditProfile}
              className="bg-white text-orange-600 hover:bg-orange-100"
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onReport}
              className="bg-white text-orange-600 hover:bg-orange-100"
            >
              <Shield className="h-4 w-4 mr-2" />
              Report
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onShare}
            className="bg-white text-orange-600 hover:bg-orange-100"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
