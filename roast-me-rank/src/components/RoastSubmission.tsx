import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Flame, AlertCircle } from 'lucide-react';

interface RoastSubmissionProps {
  targetUsername: string;
  currentUser?: {
    id: string;
    username: string;
    avatarUrl?: string;
  } | null;
  onSubmit: (content: string) => Promise<void>;
  isAnonymous?: boolean;
  setIsAnonymous?: (value: boolean) => void;
}

export function RoastSubmission({
  targetUsername,
  currentUser,
  onSubmit,
  isAnonymous = false,
  setIsAnonymous,
}: RoastSubmissionProps) {
  const [content, setContent] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [charCount, setCharCount] = React.useState(0);
  const MAX_CHARS = 500;
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setContent(value);
      setCharCount(value.length);
      setError(null);
    }
  };
  
  const handleSubmit = async () => {
    if (!content.trim()) {
      setError('Please write something first');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSubmit(content);
      setContent('');
      setCharCount(0);
    } catch (err) {
      setError('Failed to submit roast. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get initials for avatar fallback
  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="mb-3 flex items-center gap-2">
        <Flame className="h-5 w-5 text-orange-500" />
        <h2 className="text-lg font-semibold">Roast {targetUsername}</h2>
      </div>
      
      <div className="flex gap-3">
        {currentUser && !isAnonymous ? (
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.username} />
            <AvatarFallback className="bg-orange-500 text-white">
              {getInitials(currentUser.username)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gray-300 text-gray-600">
              ?
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className="flex-1">
          <Textarea
            placeholder={`Give ${targetUsername} your best roast...`}
            value={content}
            onChange={handleContentChange}
            className="mb-2 min-h-[100px]"
            disabled={isSubmitting}
          />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className={`text-xs ${charCount > MAX_CHARS * 0.9 ? 'text-orange-500' : 'text-gray-500'}`}>
                {charCount}/{MAX_CHARS}
              </span>
              
              {error && (
                <div className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {error}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {setIsAnonymous && (
                <label className="flex items-center gap-1 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={() => setIsAnonymous(!isAnonymous)}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  Anonymous
                </label>
              )}
              
              <Button
                variant="fire"
                onClick={handleSubmit}
                disabled={!content.trim() || isSubmitting}
              >
                {isSubmitting ? 'Posting...' : 'Post Roast'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 border-t border-gray-100 pt-3">
        <p>Remember: Keep it funny, not hateful. All roasts are moderated for content.</p>
      </div>
    </div>
  );
}
