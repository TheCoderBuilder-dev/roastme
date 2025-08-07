'use client';

import React, { useEffect, useState } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSupabase } from '@/context/SupabaseProvider';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import { useToast } from '@/components/ui/use-toast';

type Notification = {
  id: string;
  user_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
  type: 'roast' | 'vote' | 'achievement' | 'system';
  related_id?: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSupabase();
  const { toast } = useToast();
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: 'Error',
        description: 'Failed to load notifications',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: 'Error',
        description: 'Failed to update notification',
        variant: 'destructive',
      });
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setNotifications(prev => prev.filter(notif => notif.id !== id));
      toast({
        title: 'Success',
        description: 'Notification deleted',
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete notification',
        variant: 'destructive',
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user?.id)
        .eq('is_read', false);

      if (error) {
        throw error;
      }

      setNotifications(prev => prev.map(notif => ({ ...notif, is_read: true })));
      toast({
        title: 'Success',
        description: 'All notifications marked as read',
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast({
        title: 'Error',
        description: 'Failed to update notifications',
        variant: 'destructive',
      });
    }
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return `${diffSecs} seconds ago`;
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'roast':
        return '🔥';
      case 'vote':
        return '👍';
      case 'achievement':
        return '🏆';
      default:
        return '📢';
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Bell className="mr-2" /> Notifications
        </h1>
        <Button onClick={markAllAsRead} variant="outline" className="ml-auto mr-2">
          <Check className="h-4 w-4 mr-2" />
          Mark All as Read
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-t-2 border-orange-500 rounded-full"></div>
        </div>
      ) : notifications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium">No notifications yet</h3>
            <p className="text-gray-500 mt-2">
              We'll notify you when someone roasts you, votes on your roasts, or when you achieve something!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`transition ${notification.is_read ? '' : 'bg-orange-50'}`}>
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <p className="font-medium">{notification.message}</p>
                    <p className="text-sm text-gray-500">{getRelativeTime(notification.created_at)}</p>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.is_read && (
                      <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
