'use client';

import { createBrowserSupabaseClient } from './supabase-browser';
import { User, Roast, RoastWithUser } from './types';

// Initialize the Supabase client
const supabase = createBrowserSupabaseClient();

// User-related functions
export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  if (error || !data) return null;
  
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    createdAt: data.created_at,
    level: data.level,
    xp: data.xp,
    isPrivate: data.is_private,
    filterModeEnabled: data.filter_mode_enabled,
    approveRoastsFirst: data.approve_roasts_first
  };
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();
    
  if (error || !data) return null;
  
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    createdAt: data.created_at,
    level: data.level,
    xp: data.xp,
    isPrivate: data.is_private,
    filterModeEnabled: data.filter_mode_enabled,
    approveRoastsFirst: data.approve_roasts_first
  };
}

export async function getRandomUsers(count: number = 5): Promise<User[]> {
  // Get random profiles that are not private
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_private', false)
    .order('created_at', { ascending: false })
    .limit(count);
    
  if (error || !data) return [];
  
  return data.map(profile => ({
    id: profile.id,
    username: profile.username,
    email: profile.email,
    avatarUrl: profile.avatar_url,
    bio: profile.bio,
    createdAt: profile.created_at,
    level: profile.level,
    xp: profile.xp,
    isPrivate: profile.is_private,
    filterModeEnabled: profile.filter_mode_enabled,
    approveRoastsFirst: profile.approve_roasts_first
  }));
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Omit<User, 'id' | 'createdAt'>>
): Promise<User | null> {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      username: updates.username,
      bio: updates.bio,
      avatar_url: updates.avatarUrl,
      is_private: updates.isPrivate,
      filter_mode_enabled: updates.filterModeEnabled,
      approve_roasts_first: updates.approveRoastsFirst
    })
    .eq('id', userId)
    .select()
    .single();
    
  if (error || !data) return null;
  
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    createdAt: data.created_at,
    level: data.level,
    xp: data.xp,
    isPrivate: data.is_private,
    filterModeEnabled: data.filter_mode_enabled,
    approveRoastsFirst: data.approve_roasts_first
  };
}

// Roast-related functions
export async function getRoastsForUser(userId: string): Promise<RoastWithUser[]> {
  const { data, error } = await supabase
    .from('roasts')
    .select(`
      *,
      user:profiles(username, avatar_url, level)
    `)
    .eq('target_user_id', userId)
    .eq('is_hidden', false)
    .order('created_at', { ascending: false });
    
  if (error || !data) return [];
  
  return data.map(roast => ({
    id: roast.id,
    content: roast.content,
    userId: roast.user_id,
    targetUserId: roast.target_user_id,
    createdAt: roast.created_at,
    upvotes: roast.upvotes,
    downvotes: roast.downvotes,
    isHidden: roast.is_hidden,
    isFlagged: roast.is_flagged,
    parentId: roast.parent_id,
    user: {
      username: roast.user.username,
      avatarUrl: roast.user.avatar_url,
      level: roast.user.level
    }
  }));
}

export async function createRoast(
  content: string,
  targetUserId: string
): Promise<Roast | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('roasts')
    .insert({
      content,
      user_id: user.id,
      target_user_id: targetUserId
    })
    .select()
    .single();
    
  if (error || !data) return null;
  
  return {
    id: data.id,
    content: data.content,
    userId: data.user_id,
    targetUserId: data.target_user_id,
    createdAt: data.created_at,
    upvotes: data.upvotes,
    downvotes: data.downvotes,
    isHidden: data.is_hidden,
    isFlagged: data.is_flagged,
    parentId: data.parent_id
  };
}

export async function voteOnRoast(
  roastId: string,
  voteType: 'upvote' | 'downvote'
): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;
  
  // Check if user has already voted
  const { data: existingVote } = await supabase
    .from('votes')
    .select('*')
    .eq('user_id', user.id)
    .eq('roast_id', roastId)
    .single();
    
  if (existingVote) {
    // Update existing vote if different
    if (existingVote.vote_type !== voteType) {
      const { error } = await supabase
        .from('votes')
        .update({ vote_type: voteType })
        .eq('id', existingVote.id);
        
      return !error;
    }
    
    // Delete vote if the same (toggle)
    const { error } = await supabase
      .from('votes')
      .delete()
      .eq('id', existingVote.id);
      
    return !error;
  }
  
  // Create new vote
  const { error } = await supabase
    .from('votes')
    .insert({
      user_id: user.id,
      roast_id: roastId,
      vote_type: voteType
    });
    
  return !error;
}

export async function getUserVote(
  roastId: string
): Promise<'upvote' | 'downvote' | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data } = await supabase
    .from('votes')
    .select('vote_type')
    .eq('user_id', user.id)
    .eq('roast_id', roastId)
    .single();
    
  return data?.vote_type as 'upvote' | 'downvote' | null;
}

// Leaderboard functions
export async function getTopRoasters(limit: number = 10): Promise<User[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('xp', { ascending: false })
    .limit(limit);
    
  if (error || !data) return [];
  
  return data.map(profile => ({
    id: profile.id,
    username: profile.username,
    email: profile.email,
    avatarUrl: profile.avatar_url,
    bio: profile.bio,
    createdAt: profile.created_at,
    level: profile.level,
    xp: profile.xp,
    isPrivate: profile.is_private,
    filterModeEnabled: profile.filter_mode_enabled,
    approveRoastsFirst: profile.approve_roasts_first
  }));
}

export async function getTopRoasts(limit: number = 10): Promise<RoastWithUser[]> {
  const { data, error } = await supabase
    .from('roasts')
    .select(`
      *,
      user:profiles(username, avatar_url, level)
    `)
    .eq('is_hidden', false)
    .order('upvotes', { ascending: false })
    .limit(limit);
    
  if (error || !data) return [];
  
  return data.map(roast => ({
    id: roast.id,
    content: roast.content,
    userId: roast.user_id,
    targetUserId: roast.target_user_id,
    createdAt: roast.created_at,
    upvotes: roast.upvotes,
    downvotes: roast.downvotes,
    isHidden: roast.is_hidden,
    isFlagged: roast.is_flagged,
    parentId: roast.parent_id,
    user: {
      username: roast.user.username,
      avatarUrl: roast.user.avatar_url,
      level: roast.user.level
    }
  }));
}
