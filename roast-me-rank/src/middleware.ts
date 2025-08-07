import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Create a response object to modify and return
  const response = NextResponse.next()
  
  // Check if the user is authenticated
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password']
  // Define auth routes that should redirect to home if already authenticated
  const authRoutes = ['/login', '/register', '/forgot-password']
  
  // For auth routes, redirect to home if already logged in
  if (authRoutes.includes(pathname) && session) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // For protected routes, redirect to login if not authenticated
  if (!publicRoutes.includes(pathname) && !pathname.startsWith('/_next') && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return response
}

export const config = {
  // Matcher for all routes except for api routes, static files, and images
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
}
