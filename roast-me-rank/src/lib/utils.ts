import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 5) return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function calculateLevel(xp: number): number {
  // Simple logarithmic level function - can be adjusted
  return Math.floor(Math.log(xp + 1) / Math.log(1.5)) + 1;
}

export function calculateXpForNextLevel(level: number): number {
  // Inverse of the level function
  return Math.pow(1.5, level) - 1;
}

// Filter for profanity based on filter level
export function filterProfanity(text: string, level: 'none' | 'mild' | 'moderate' | 'strict'): string {
  if (level === 'none') return text;
  
  // This is a simple placeholder. In a real app, you'd use a proper profanity filter library
  // or API with configurable levels
  const mildWords = ['damn', 'hell'];
  const moderateWords = [...mildWords, 'ass', 'shit'];
  const strictWords = [...moderateWords, 'fuck', 'bitch'];
  
  let filteredText = text;
  let wordsToFilter: string[] = [];
  
  if (level === 'mild') wordsToFilter = mildWords;
  else if (level === 'moderate') wordsToFilter = moderateWords;
  else if (level === 'strict') wordsToFilter = strictWords;
  
  wordsToFilter.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filteredText = filteredText.replace(regex, '*'.repeat(word.length));
  });
  
  return filteredText;
}

// Generate a shareable URL for profiles
export function getShareableProfileUrl(username: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}/profile/${username}`;
}

// Generate meta tags for sharing
export function generateShareMetaTags(user: { username: string; bio?: string; avatarUrl?: string }): {
  title: string;
  description: string;
  image: string;
} {
  return {
    title: `Roast ${user.username} on Roast Me Rank`,
    description: user.bio || `Give ${user.username} your best roast on Roast Me Rank!`,
    image: user.avatarUrl || `${process.env.NEXT_PUBLIC_APP_URL}/api/og?username=${encodeURIComponent(user.username)}`,
  };
}
