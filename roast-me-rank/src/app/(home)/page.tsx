import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LeaderboardCard } from '@/components/LeaderboardCard';
import { RoastCard } from '@/components/RoastCard';
import { LeaderboardEntry, RoastWithUser } from '@/lib/types';
import { Flame, Shuffle, Trophy, TrendingUp } from 'lucide-react';

// Mock data for demonstration
const mockTopRoasters: LeaderboardEntry[] = [
  {
    userId: '1',
    username: 'RoastKing',
    avatarUrl: undefined,
    score: 1250,
    level: 32,
    position: 1
  },
  {
    userId: '2',
    username: 'BurnMaster',
    avatarUrl: undefined,
    score: 980,
    level: 28,
    position: 2
  },
  {
    userId: '3',
    username: 'FlameQueen',
    avatarUrl: undefined,
    score: 820,
    level: 25,
    position: 3
  },
  {
    userId: '4',
    username: 'RoastBeast',
    avatarUrl: undefined,
    score: 720,
    level: 22,
    position: 4
  },
  {
    userId: '5',
    username: 'SavageRoaster',
    avatarUrl: undefined,
    score: 650,
    level: 20,
    position: 5
  },
];

const mockTopRoasted: LeaderboardEntry[] = [
  {
    userId: '6',
    username: 'BraveSoul',
    avatarUrl: undefined,
    score: 385,
    level: 18,
    position: 1
  },
  {
    userId: '7',
    username: 'RoastMe2000',
    avatarUrl: undefined,
    score: 310,
    level: 16,
    position: 2
  },
  {
    userId: '8',
    username: 'CantTouchThis',
    avatarUrl: undefined,
    score: 290,
    level: 15,
    position: 3
  },
  {
    userId: '9',
    username: 'RoastTarget',
    avatarUrl: undefined,
    score: 250,
    level: 14,
    position: 4
  },
  {
    userId: '10',
    username: 'BurnMePlease',
    avatarUrl: undefined,
    score: 220,
    level: 12,
    position: 5
  },
];

const mockTrendingRoasts: RoastWithUser[] = [
  {
    id: '1',
    content: "Your selfie looks like it was taken by a potato that was dropped in a puddle and then microwaved for 30 seconds.",
    userId: '1',
    targetUserId: '6',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    upvotes: 128,
    downvotes: 12,
    isHidden: false,
    isFlagged: false,
    user: {
      username: 'RoastKing',
      avatarUrl: undefined,
      level: 32
    }
  },
  {
    id: '2',
    content: "Your bio says 'entrepreneur' but your background screams 'I sell knockoff sunglasses at the beach'.",
    userId: '3',
    targetUserId: '7',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    upvotes: 93,
    downvotes: 8,
    isHidden: false,
    isFlagged: false,
    user: {
      username: 'FlameQueen',
      avatarUrl: undefined,
      level: 25
    }
  },
  {
    id: '3',
    content: "You look like you'd be out of breath after a vigorous game of chess.",
    userId: '2',
    targetUserId: '8',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    upvotes: 87,
    downvotes: 5,
    isHidden: false,
    isFlagged: false,
    user: {
      username: 'BurnMaster',
      avatarUrl: undefined,
      level: 28
    }
  },
];

export default function Home() {
  // These functions would be implemented with actual API calls in a real app
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

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 -mx-4 px-4 py-12 mb-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Get Roasted, Get Famous 🔥
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            Upload your pic, take the heat, and climb the ranks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-100">
                Sign Up & Get Roasted
              </Button>
            </Link>
            <Link href="/discover">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-orange-600">
                <Shuffle className="h-5 w-5 mr-2" />
                Discover Roastees
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-orange-600 p-4 rounded-lg">
              <div className="text-3xl font-bold mb-1">50K+</div>
              <div className="text-sm text-orange-200">Roasts Served</div>
            </div>
            <div className="bg-orange-600 p-4 rounded-lg">
              <div className="text-3xl font-bold mb-1">20K+</div>
              <div className="text-sm text-orange-200">Active Users</div>
            </div>
            <div className="bg-orange-600 p-4 rounded-lg">
              <div className="text-3xl font-bold mb-1">1M+</div>
              <div className="text-sm text-orange-200">Upvotes</div>
            </div>
            <div className="bg-orange-600 p-4 rounded-lg">
              <div className="text-3xl font-bold mb-1">5K+</div>
              <div className="text-sm text-orange-200">Daily Roasts</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column - Leaderboards */}
        <div className="md:col-span-4 order-2 md:order-1">
          <LeaderboardCard 
            title="Top Roasters 🔥" 
            entries={mockTopRoasters} 
            type="roasters" 
          />
          
          <LeaderboardCard 
            title="Most Roasted 🎯" 
            entries={mockTopRoasted} 
            type="roasted" 
          />
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-orange-500" />
              Weekly Challenges
            </h2>
            
            <div className="space-y-4">
              <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800">Shakespeare Week</h3>
                <p className="text-sm text-gray-700 mb-2">Roast in Shakespearean style to earn bonus XP!</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5 days left</span>
                  <span>+200 XP</span>
                </div>
              </div>
              
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800">Gen Z Slang Battle</h3>
                <p className="text-sm text-gray-700 mb-2">Use Gen Z slang in your roasts to earn bonuses!</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>2 days left</span>
                  <span>+150 XP</span>
                </div>
              </div>
            </div>
            
            <Link href="/challenges">
              <Button variant="outline" className="w-full mt-4 text-orange-600 border-orange-200">
                View All Challenges
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Right Column - Trending Roasts */}
        <div className="md:col-span-8 order-1 md:order-2">
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              Trending Roasts
            </h2>
            
            <div className="space-y-4">
              {mockTrendingRoasts.map((roast) => (
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
            </div>
            
            <Link href="/discover">
              <Button variant="outline" className="w-full mt-4">
                Discover More
              </Button>
            </Link>
          </div>
          
          {/* How It Works Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              How Roast Me Rank Works
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-orange-100 text-orange-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  1
                </div>
                <h3 className="font-semibold mb-2">Upload Your Pic</h3>
                <p className="text-sm text-gray-600">Add a photo and quick bio to your profile.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 text-orange-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  2
                </div>
                <h3 className="font-semibold mb-2">Get Roasted</h3>
                <p className="text-sm text-gray-600">Share your profile and let the roasts pour in.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 text-orange-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  3
                </div>
                <h3 className="font-semibold mb-2">Climb the Ranks</h3>
                <p className="text-sm text-gray-600">Earn XP, level up, and top the leaderboards.</p>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-100 pt-6 text-center">
              <Link href="/register">
                <Button variant="fire" size="lg">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
