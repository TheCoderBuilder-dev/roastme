'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@radix-ui/react-switch';
import { Settings, User, Shield, Bell, Lock } from 'lucide-react';
import { useSupabase } from '@/context/SupabaseProvider';
import { useToast } from '@/components/ui/use-toast';
import { updateUserProfile, getCurrentUser } from '@/lib/api';

export default function SettingsPage() {
  const { user } = useSupabase();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    avatarUrl: '',
  });
  
  const [preferences, setPreferences] = useState({
    isPrivate: false,
    filterModeEnabled: true,
    approveRoastsFirst: false,
  });
  
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);
  
  const loadUserData = async () => {
    setIsLoading(true);
    try {
      const userData = await getCurrentUser();
      if (userData) {
        setProfile({
          username: userData.username,
          email: userData.email,
          bio: userData.bio || '',
          avatarUrl: userData.avatarUrl || '',
        });
        
        setPreferences({
          isPrivate: userData.isPrivate,
          filterModeEnabled: userData.filterModeEnabled,
          approveRoastsFirst: userData.approveRoastsFirst,
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your profile information',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await updateUserProfile(user!.id, {
        username: profile.username,
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
      });
      
      if (result) {
        toast({
          title: 'Profile Updated',
          description: 'Your profile has been updated successfully',
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update your profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePreferencesUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await updateUserProfile(user!.id, {
        isPrivate: preferences.isPrivate,
        filterModeEnabled: preferences.filterModeEnabled,
        approveRoastsFirst: preferences.approveRoastsFirst,
      });
      
      if (result) {
        toast({
          title: 'Preferences Updated',
          description: 'Your preferences have been updated successfully',
        });
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast({
        title: 'Error',
        description: 'Failed to update your preferences',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center mb-8">
        <Settings className="mr-2 h-6 w-6" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" /> Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="mr-2 h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="username">Username</label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={e => setProfile({...profile, username: e.target.value})}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">Email</label>
                  <Input
                    id="email"
                    value={profile.email}
                    disabled={true}
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500">
                    Email cannot be changed directly. Contact support for assistance.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="avatarUrl">Profile Picture URL</label>
                  <Input
                    id="avatarUrl"
                    value={profile.avatarUrl}
                    onChange={e => setProfile({...profile, avatarUrl: e.target.value})}
                    disabled={isLoading}
                    placeholder="https://example.com/your-image.jpg"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="bio">Bio</label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={e => setProfile({...profile, bio: e.target.value})}
                    disabled={isLoading}
                    placeholder="Tell us about yourself"
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Content Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePreferencesUpdate} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Private Profile</h3>
                    <p className="text-sm text-gray-500">
                      Hide your profile from other users and the leaderboard
                    </p>
                  </div>
                  <Switch
                    checked={preferences.isPrivate}
                    onCheckedChange={checked => setPreferences({...preferences, isPrivate: checked})}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Content Filter</h3>
                    <p className="text-sm text-gray-500">
                      Filter out potentially offensive roasts
                    </p>
                  </div>
                  <Switch
                    checked={preferences.filterModeEnabled}
                    onCheckedChange={checked => setPreferences({...preferences, filterModeEnabled: checked})}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Approve Roasts</h3>
                    <p className="text-sm text-gray-500">
                      Require your approval before roasts are published on your profile
                    </p>
                  </div>
                  <Switch
                    checked={preferences.approveRoastsFirst}
                    onCheckedChange={checked => setPreferences({...preferences, approveRoastsFirst: checked})}
                    disabled={isLoading}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Preferences'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 py-8 text-center">
                Notification preferences will be available in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium" htmlFor="current-password">Current Password</label>
                      <Input
                        id="current-password"
                        type="password"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium" htmlFor="new-password">New Password</label>
                      <Input
                        id="new-password"
                        type="password"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium" htmlFor="confirm-password">Confirm Password</label>
                      <Input
                        id="confirm-password"
                        type="password"
                        disabled={isLoading}
                      />
                    </div>
                    <Button className="w-full" disabled={isLoading}>
                      Update Password
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive" disabled={isLoading}>
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
