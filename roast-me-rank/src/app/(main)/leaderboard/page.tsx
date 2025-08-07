import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { LeaderboardEntry } from '@/lib/types';
import { Trophy, Star, ThumbsUp, User, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const mockTopRoasters: LeaderboardEntry[] = Array.from({ length: 20 }, (_, i) => ({
  userId: `roaster-${i + 1}`,
  username: `TopRoaster${i + 1}`,
  avatarUrl: undefined,
  score: Math.floor(2000 / (i + 1)),
  level: Math.floor(50 / (i + 1) + 5),
  position: i + 1
}));

const mockTopRoasted: LeaderboardEntry[] = Array.from({ length: 20 }, (_, i) => ({
  userId: `roasted-${i + 1}`,
  username: `BraveSoul${i + 1}`,
  avatarUrl: undefined,
  score: Math.floor(1000 / (i + 1)),
  level: Math.floor(40 / (i + 1) + 4),
  position: i + 1
}));

const mockTopUpvoted: LeaderboardEntry[] = Array.from({ length: 20 }, (_, i) => ({
  userId: `upvoted-${i + 1}`,
  username: `CleverRoaster${i + 1}`,
  avatarUrl: undefined,
  score: Math.floor(5000 / (i + 1)),
  level: Math.floor(45 / (i + 1) + 6),
  position: i + 1
}));

export default function LeaderboardPage() {
  // Get initials for avatar fallback
  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  // Get medal or position display
  const getPositionDisplay = (position: number) => {
    if (position === 1) return <span className="text-2xl">🥇</span>;
    if (position === 2) return <span className="text-2xl">🥈</span>;
    if (position === 3) return <span className="text-2xl">🥉</span>;
    return <span className="text-gray-700 font-semibold">{position}</span>;
  };

  // Get background color for top positions
  const getRowBgColor = (position: number) => {
    if (position === 1) return "bg-yellow-50";
    if (position === 2) return "bg-gray-50";
    if (position === 3) return "bg-amber-50";
    return "";
  };

  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="h-6 w-6 text-orange-500" />
              Leaderboards
            </h1>
            <p className="text-gray-500">
              The best roasters and roastees in the community
            </p>
          </div>
          
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search users..." 
                className="pl-8" 
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </div>
        
        <Tabs defaultValue="roasters">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="roasters" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              Top Roasters
            </TabsTrigger>
            <TabsTrigger value="roasted" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Most Roasted
            </TabsTrigger>
            <TabsTrigger value="upvoted" className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              Most Upvoted
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="roasters">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 w-16">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600">Level</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-600">Roast Score</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTopRoasters.map((entry) => (
                    <tr 
                      key={entry.userId} 
                      className={`border-b border-gray-100 hover:bg-gray-50 ${getRowBgColor(entry.position)}`}
                    >
                      <td className="py-3 px-4 text-center">
                        {getPositionDisplay(entry.position)}
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/profile/${entry.username}`} className="flex items-center gap-3 hover:text-orange-500">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={entry.avatarUrl || undefined} alt={entry.username} />
                            <AvatarFallback className="bg-orange-100 text-orange-800">
                              {getInitials(entry.username)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{entry.username}</span>
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block bg-orange-100 text-orange-800 rounded-full px-2 py-1 text-xs font-semibold">
                          Level {entry.level}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-orange-500">
                        {entry.score.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-center text-gray-500 text-sm">
              Leaderboard updates every hour. Last updated: 5 minutes ago.
            </div>
          </TabsContent>
          
          <TabsContent value="roasted">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 w-16">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600">Level</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-600">Roasts Received</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTopRoasted.map((entry) => (
                    <tr 
                      key={entry.userId} 
                      className={`border-b border-gray-100 hover:bg-gray-50 ${getRowBgColor(entry.position)}`}
                    >
                      <td className="py-3 px-4 text-center">
                        {getPositionDisplay(entry.position)}
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/profile/${entry.username}`} className="flex items-center gap-3 hover:text-orange-500">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={entry.avatarUrl || undefined} alt={entry.username} />
                            <AvatarFallback className="bg-blue-100 text-blue-800">
                              {getInitials(entry.username)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{entry.username}</span>
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-semibold">
                          Level {entry.level}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-blue-500">
                        {entry.score.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-center text-gray-500 text-sm">
              Leaderboard updates every hour. Last updated: 5 minutes ago.
            </div>
          </TabsContent>
          
          <TabsContent value="upvoted">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 w-16">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600">Level</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-600">Total Upvotes</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTopUpvoted.map((entry) => (
                    <tr 
                      key={entry.userId} 
                      className={`border-b border-gray-100 hover:bg-gray-50 ${getRowBgColor(entry.position)}`}
                    >
                      <td className="py-3 px-4 text-center">
                        {getPositionDisplay(entry.position)}
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/profile/${entry.username}`} className="flex items-center gap-3 hover:text-orange-500">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={entry.avatarUrl || undefined} alt={entry.username} />
                            <AvatarFallback className="bg-green-100 text-green-800">
                              {getInitials(entry.username)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{entry.username}</span>
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs font-semibold">
                          Level {entry.level}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-green-500">
                        {entry.score.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-center text-gray-500 text-sm">
              Leaderboard updates every hour. Last updated: 5 minutes ago.
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">How Do Leaderboards Work?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Top Roasters
            </h3>
            <p className="text-sm text-gray-700">
              Ranked by a combination of upvotes received on roasts and total number of quality roasts submitted.
            </p>
          </div>
          
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <User className="h-4 w-4" />
              Most Roasted
            </h3>
            <p className="text-sm text-gray-700">
              Ranked by the total number of roasts received. These brave souls take the heat!
            </p>
          </div>
          
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              Most Upvoted
            </h3>
            <p className="text-sm text-gray-700">
              Ranked purely by the total number of upvotes received on all roasts submitted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
