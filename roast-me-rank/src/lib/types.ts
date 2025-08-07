export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  level: number;
  xp: number;
  isPrivate: boolean;
  filterModeEnabled: boolean;
  approveRoastsFirst: boolean;
}

export interface Roast {
  id: string;
  content: string;
  userId: string;
  targetUserId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  isHidden: boolean;
  isFlagged: boolean;
  parentId?: string; // For reply threads
}

export interface RoastWithUser extends Roast {
  user: {
    username: string;
    avatarUrl?: string;
    level: number;
  };
}

export interface Achievement {
  id: string;
  userId: string;
  type: string;
  title: string;
  description: string;
  iconUrl: string;
  unlockedAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatarUrl?: string;
  score: number;
  level: number;
  position: number;
}

export interface RoastChallenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  theme: string;
  rules: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
  linkTo?: string;
  triggeredBy?: string;
}

export type FilterLevel = 'none' | 'mild' | 'moderate' | 'strict';

export interface UserSettings {
  userId: string;
  isPrivate: boolean;
  filterLevel: FilterLevel;
  approveRoastsFirst: boolean;
  allowAnonymousRoasts: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export type UserRole = 'user' | 'moderator' | 'admin';

export interface ModAction {
  id: string;
  moderatorId: string;
  targetUserId?: string;
  targetRoastId?: string;
  action: 'warn' | 'mute' | 'tempban' | 'permban' | 'removeContent';
  reason: string;
  duration?: number; // in hours, if applicable
  createdAt: string;
}
