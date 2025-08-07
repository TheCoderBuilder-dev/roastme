import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RoastWithUser } from '@/lib/types';
import { timeAgo } from '@/lib/utils';
import { ThumbsUp, ThumbsDown, MessageCircle, Flag, Share } from 'lucide-react';

interface RoastCardProps {
  roast: RoastWithUser;
  onUpvote: (roastId: string) => void;
  onDownvote: (roastId: string) => void;
  onReply: (roastId: string) => void;
  onReport: (roastId: string) => void;
  onShare: (roastId: string) => void;
  isReplyOpen?: boolean;
  showReplyInput?: boolean;
}

export function RoastCard({
  roast,
  onUpvote,
  onDownvote,
  onReply,
  onReport,
  onShare,
  isReplyOpen = false,
  showReplyInput = false,
}: RoastCardProps) {
  const [replyText, setReplyText] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;
    
    setIsSubmitting(true);
    try {
      // Implement reply submission logic
      console.log('Submitting reply:', replyText);
      setReplyText('');
      onReply(roast.id);
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get initials for avatar fallback
  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <Card className="mb-4 border-gray-200 hover:border-orange-300 transition-colors">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={roast.user.avatarUrl} alt={roast.user.username} />
          <AvatarFallback className="bg-orange-500 text-white">
            {getInitials(roast.user.username)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">{roast.user.username}</p>
          <p className="text-xs text-gray-500">Level {roast.user.level} • {timeAgo(roast.createdAt)}</p>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className="text-base whitespace-pre-line">{roast.content}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onUpvote(roast.id)}
            className="text-gray-500 hover:text-orange-500"
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            {roast.upvotes}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDownvote(roast.id)}
            className="text-gray-500 hover:text-blue-500"
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            {roast.downvotes}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onReply(roast.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Reply
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onReport(roast.id)}
            className="text-gray-500 hover:text-red-500"
          >
            <Flag className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onShare(roast.id)}
            className="text-gray-500 hover:text-green-500"
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
      
      {showReplyInput && (
        <div className="p-4 pt-0 border-t border-gray-100">
          <Textarea
            placeholder="Write your roast reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-end">
            <Button 
              variant="fire" 
              size="sm" 
              onClick={handleSubmitReply}
              disabled={!replyText.trim() || isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Roast Back'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
