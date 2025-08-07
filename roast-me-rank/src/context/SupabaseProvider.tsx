'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'
import { type User, type Session } from '@supabase/supabase-js'
import { createUserProfile, checkUsernameExists } from '@/app/api/auth/actions'

type SupabaseContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signUp = async (email: string, password: string, username: string) => {
    try {
      // Check if username is taken using server action
      const usernameCheck = await checkUsernameExists(username);
      
      if (usernameCheck.exists) {
        return { error: { message: 'Username is already taken' } };
      }
      
      // Register the user with auth service
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (signUpError) {
        console.error('Error during signup:', signUpError);
        return { error: signUpError };
      }

      if (!data.user) {
        return { error: { message: 'No user returned from signup' } };
      }

      // Create user profile using server action (bypasses RLS)
      const profileResult = await createUserProfile(
        data.user.id,
        username,
        email
      );

      if (!profileResult.success) {
        console.error('Error creating profile:', profileResult.error);
        return { error: profileResult.error };
      }

      return { error: null };
    } catch (err) {
      console.error('Unexpected error in signup process:', err);
      return { error: err };
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}
