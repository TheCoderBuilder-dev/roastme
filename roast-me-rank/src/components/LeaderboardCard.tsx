"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LeaderboardEntry } from '@/lib/types';
import { Trophy, ChevronRight } from 'lucide-react';

interface LeaderboardCardProps {
  title: string;
  entries: LeaderboardEntry[];
  type: 'roasted' | 'roasters';
}

export function LeaderboardCard({ title, entries, type }: LeaderboardCardProps) {
  // Get medal color based on position
  const getMedalColor = (position: number) => {
    switch (position) {
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-amber-700';
      default:
        return 'text-gray-600';
    }
  };
  
  // Get initials for avatar fallback
  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <Link href="/leaderboard" className="text-sm text-orange-500 flex items-center hover:underline">
          View All
          <ChevronRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3">
          {entries.map((entry) => (
            <li key={entry.userId} className="flex items-center gap-3">
              <span className={`font-bold w-6 text-center ${getMedalColor(entry.position)}`}>
                {entry.position === 1 && '🥇'}
                {entry.position === 2 && '🥈'}
                {entry.position === 3 && '🥉'}
                {entry.position > 3 && entry.position}
              </span>
              
              <Link href={`/profile/${entry.username}`} className="flex-1 flex items-center gap-3 hover:bg-gray-50 rounded-md p-2 transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={entry.avatarUrl} alt={entry.username} />
                  <AvatarFallback className="bg-orange-100 text-orange-800">
                    {getInitials(entry.username)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <p className="font-medium">{entry.username}</p>
                  <p className="text-xs text-gray-500">Level {entry.level}</p>
                </div>
                
                <div className="text-right">
                  <span className="font-bold text-orange-500">{entry.score}</span>
                  <p className="text-xs text-gray-500">
                    {type === 'roasted' ? 'roasts received' : 'points earned'}
                  </p>
                </div>
              </Link>
            </li>
          ))}
          
          {entries.length === 0 && (
            <li className="text-center py-4 text-gray-500">
              No entries yet. Be the first!
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
