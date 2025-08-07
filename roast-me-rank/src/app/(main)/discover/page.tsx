import React from 'react';
import { Button } from '@/components/ui/button';
import { ProfileHeader } from '@/components/ProfileHeader';
import { RoastSubmission } from '@/components/RoastSubmission';
import { RoastCard } from '@/components/RoastCard';
import { User, RoastWithUser } from '@/lib/types';
import { Shuffle, Users, ArrowRight, ArrowLeft } from 'lucide-react';

// Mock data - in a real app this would be fetched from the API
const mockProfiles: User[] = [
  {
    id: '101',
    username: 'RandomPerson1',
    email: 'random1@example.com',
    bio: 'Software engineer by day, pizza destroyer by night 🍕',
    avatarUrl: undefined,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
    level: 12,
    xp: 1250,
    isPrivate: false,
    filterModeEnabled: true,
    approveRoastsFirst: false,
  },
  {
    id: '102',
    username: 'RoastMePlease',
    email: 'roastme@example.com',
    bio: 'Aspiring influencer. My ego needs a reality check!',
    avatarUrl: undefined,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(), // 20 days ago
    level: 8,
    xp: 890,
    isPrivate: false,
    filterModeEnabled: false,
    approveRoastsFirst: false,
  },
  {
    id: '103',
    username: 'BurnMeSoftly',
    email: 'burnme@example.com',
    bio: 'Just graduated art school. Destroy my dreams gently.',
    avatarUrl: undefined,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
    level: 5,
    xp: 620,
    isPrivate: false,
    filterModeEnabled: true,
    approveRoastsFirst: true,
  },
];

const mockRoasts: { [key: string]: RoastWithUser[] } = {
  '101': [
    {
      id: '1001',
      content: "Your 'software engineer' title is probably the only thing with structure in your life. The pizza isn't the only thing getting destroyed at night.",
      userId: '1',
      targetUserId: '101',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
      upvotes: 32,
      downvotes: 3,
      isHidden: false,
      isFlagged: false,
      user: {
        username: 'RoastKing',
        avatarUrl: undefined,
        level: 32
      }
    },
  ],
  '102': [
    {
      id: '1002',
      content: "Aspiring influencer? The only thing you're influencing is my decision to get laser eye surgery so I never have to see profiles like yours again.",
      userId: '2',
      targetUserId: '102',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      upvotes: 48,
      downvotes: 2,
      isHidden: false,
      isFlagged: false,
      user: {
        username: 'BurnMaster',
        avatarUrl: undefined,
        level: 28
      }
    },
  ],
  '103': [],
};

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const currentProfile = mockProfiles[currentIndex];
  const roasts = mockRoasts[currentProfile.id] || [];
  
  // For demonstration purposes - these would be API calls in a real app
  const handleSubmitRoast = async (content: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Submitted roast for', currentProfile.username, ':', content);
    setHasSubmitted(true);
    setIsLoading(false);
  };
  
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % mockProfiles.length;
    setCurrentIndex(nextIndex);
    setHasSubmitted(false);
  };
  
  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + mockProfiles.length) % mockProfiles.length;
    setCurrentIndex(prevIndex);
    setHasSubmitted(false);
  };
  
  const handleRandom = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * mockProfiles.length);
    } while (randomIndex === currentIndex && mockProfiles.length > 1);
    
    setCurrentIndex(randomIndex);
    setHasSubmitted(false);
  };
  
  // Mock current user - in a real app, this would come from auth state
  const currentUser = {
    id: '1',
    username: 'RoastKing',
    avatarUrl: undefined,
  };
  
  // Handlers for roast interactions
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
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-orange-500" />
              Discover People to Roast
            </h1>
            <p className="text-gray-500">
              Find random people to roast and earn XP
            </p>
          </div>
          
          <Button variant="fire" onClick={handleRandom}>
            <Shuffle className="h-5 w-5 mr-2" />
            Random User
          </Button>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={handlePrevious}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <span className="text-gray-500">
            {currentIndex + 1} of {mockProfiles.length}
          </span>
          
          <Button variant="outline" onClick={handleNext}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      
      <ProfileHeader 
        user={currentProfile}
        isCurrentUser={false}
        onShare={() => console.log('Share profile')}
        onReport={() => console.log('Report profile')}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column - Roast Form */}
        <div className="md:col-span-5 order-2 md:order-1">
          {!hasSubmitted ? (
            <RoastSubmission 
              targetUsername={currentProfile.username}
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
                Your roast has been submitted and {currentProfile.username} will feel the burn! 🔥
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
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Roasting Tips</h2>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>Be creative and original</li>
              <li>Roast the photo, bio, or username</li>
              <li>Keep it funny, not hateful</li>
              <li>Clever wordplay gets more upvotes</li>
              <li>Remember, it's all in good fun!</li>
            </ul>
          </div>
        </div>
        
        {/* Right Column - Existing Roasts */}
        <div className="md:col-span-7 order-1 md:order-2">
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Recent Roasts for {currentProfile.username}
            </h2>
            
            <div className="space-y-4">
              {roasts.map((roast) => (
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
              
              {roasts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-2">No roasts yet. Be the first to roast {currentProfile.username}!</p>
                  <p className="text-sm">First roaster gets bonus XP!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
