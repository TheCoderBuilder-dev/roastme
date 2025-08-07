'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Home, 
  Trophy, 
  Search, 
  User, 
  Bell, 
  Menu, 
  X,
  LogOut,
  Settings
} from 'lucide-react';

interface NavBarProps {
  user?: {
    id: string;
    username: string;
    avatarUrl?: string;
  } | null;
  notifications?: number;
  onLogout?: () => void;
}

export function NavBar({ user, notifications = 0, onLogout }: NavBarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // Get initials for avatar fallback
  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    closeMenu();
  };
  
  const navItems = [
    { name: 'Home', href: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Discover', href: '/discover', icon: <Search className="h-5 w-5" /> },
    { name: 'Leaderboard', href: '/leaderboard', icon: <Trophy className="h-5 w-5" /> },
    { name: 'Achievements', href: '/achievements', icon: <Trophy className="h-5 w-5" /> },
  ];
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-orange-500">🔥 Roast Me Rank</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 ${
                  pathname === item.href 
                    ? 'bg-orange-100 text-orange-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link href="/notifications">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications > 9 ? '9+' : notifications}
                      </span>
                    )}
                  </Button>
                </Link>
                
                <Link href={`/profile/${user.username}`}>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl} alt={user.username} />
                      <AvatarFallback className="bg-orange-500 text-white text-xs">
                        {user.username && getInitials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.username}</span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="fire">Sign up</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2 px-4">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                  pathname === item.href
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={closeMenu}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link
                  href="/notifications"
                  className="px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  <Bell className="h-5 w-5" />
                  Notifications
                  {notifications > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications > 9 ? '9+' : notifications}
                    </span>
                  )}
                </Link>
                
                <Link
                  href={`/profile/${user.username}`}
                  className="px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  <User className="h-5 w-5" />
                  My Profile
                </Link>
                
                <Link
                  href="/settings"
                  className="px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
                
                <button
                  className="w-full px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Log out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-gray-200">
                <Link href="/auth/login" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={closeMenu}>
                  <Button variant="fire" className="w-full">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
