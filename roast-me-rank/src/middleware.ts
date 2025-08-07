import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const response = NextResponse.next()

  // Create a Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedRoutes = ['/profile', '/notifications', '/settings', '/challenges', '/discover', '/achievements', '/leaderboard']
  
  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    requestUrl.pathname === route || requestUrl.pathname.startsWith(route + '/')
  )

  // Authentication routes
  const authRoutes = ['/auth/login', '/auth/register']
  const isAuthRoute = authRoutes.some(route => 
    requestUrl.pathname.startsWith(route)
  )

  // If the user is not logged in and is trying to access a protected route
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // If the user is logged in and is trying to access an auth route
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  // Matcher for all routes except for api routes, static files, and images
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
}
