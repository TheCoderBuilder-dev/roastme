
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Flame, ArrowRight, MessageSquare, TrendingUp } from 'lucide-react';

export default function RootPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf8]">
      {/* Nav with asymmetrical design */}
      <header className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-100 opacity-70 blur-3xl" />
        <nav className="relative z-10 flex justify-between items-center py-5 px-6 md:px-16 max-w-7xl mx-auto w-full">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-lg rotate-6 shadow-lg mr-3">
              <Flame className="h-6 w-6 text-white rotate-[-6deg]" />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900">roastme</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/discover" className="text-gray-600 text-sm font-medium hover:text-orange-500 transition-colors">Browse Roasts</Link>
            <Link href="/leaderboard" className="text-gray-600 text-sm font-medium hover:text-orange-500 transition-colors">Rankings</Link>
            <div className="h-6 w-px bg-gray-200"></div>
            <Link href="/login" className="text-gray-900 text-sm font-medium hover:text-orange-500 transition-colors">Log In</Link>
            <Link href="/register">
              <Button className="bg-black hover:bg-gray-800 text-white text-sm rounded-full px-5">Join Now</Button>
            </Link>
          </div>
          
          <button className="block md:hidden p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero section with more personality */}
        <section className="relative overflow-hidden">
          {/* Abstract shapes */}
          <div className="absolute top-40 -left-24 h-64 w-64 rounded-full bg-orange-200 opacity-50 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-blue-100 opacity-40 blur-2xl" />
          
          <div className="max-w-7xl mx-auto px-6 md:px-16 pt-12 pb-20 md:pt-20 md:pb-32">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/2 md:pr-8 mb-12 md:mb-0">
                <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1 text-sm font-medium rounded-full mb-6">
                  Just Launched 🔥
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                  Get roasted.<br />
                  <span className="text-orange-500">Earn clout.</span><br />
                  <span className="relative">
                    Have fun.
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 220 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 5.5C47.6667 2.33333 154.4 -1.7 218 5.5" stroke="#F97316" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>
                <p className="text-gray-600 text-lg mb-8 max-w-lg">
                  The platform where the internet's wittiest minds roast you. Not for the thin-skinned, but perfect for those who can laugh at themselves.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-8 py-6 text-lg font-medium shadow-lg shadow-orange-500/20">
                      Get roasted
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/discover">
                    <Button variant="outline" className="border-gray-300 hover:border-orange-300 text-gray-700 rounded-lg px-6 py-6 text-lg font-medium">
                      See examples first
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center gap-3 mt-8">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">JM</div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">KT</div>
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">AP</div>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">800+</span> people joined this week
                  </p>
                </div>
              </div>
              
              <div className="md:w-1/2 relative">
                <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Flame className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Best Roast of the Day</p>
                        <p className="text-xs text-gray-500">by RoastMaster3000</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-semibold text-orange-500">432</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-700 text-lg mb-4">
                      "Your LinkedIn profile says 'entrepreneur' but your background screams 'I sell knockoff sunglasses at the beach.'"
                    </p>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-orange-500">
                          <MessageSquare className="h-4 w-4" />
                          <span>Reply</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center text-orange-500 font-medium">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V20M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="ml-1">432</span>
                        </button>
                        <div className="w-px h-4 bg-gray-200"></div>
                        <button className="flex items-center text-gray-400">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 20V4M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="ml-1">21</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 w-28 h-28 bg-blue-50 rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-orange-50 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features section with more distinctive design */}
        <section className="bg-gradient-to-b from-white to-orange-50 py-16 md:py-24 relative overflow-hidden">
          <div className="absolute -top-10 right-1/4 h-64 w-64 rounded-full bg-orange-100 opacity-30 blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How RoastMe works</h2>
              <p className="text-gray-600 max-w-xl mx-auto">No complicated rules. Just roast and get roasted. The funniest, most creative roasters rise to the top.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="relative">
                <div className="absolute -top-6 -left-6 text-8xl font-black text-gray-100">1</div>
                <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100 h-full hover:translate-y-[-8px] transition-transform">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Submit your photo</h3>
                  <p className="text-gray-600">Upload a picture of yourself or something you want roasted by our community.</p>
                </div>
              </div>
              
              <div className="relative mt-6 md:mt-10">
                <div className="absolute -top-6 -left-6 text-8xl font-black text-gray-100">2</div>
                <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100 h-full hover:translate-y-[-8px] transition-transform">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Get creative roasts</h3>
                  <p className="text-gray-600">Our community of roasters will unleash their wit and humor on your submission.</p>
                </div>
              </div>
              
              <div className="relative mt-12 md:mt-20">
                <div className="absolute -top-6 -left-6 text-8xl font-black text-gray-100">3</div>
                <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100 h-full hover:translate-y-[-8px] transition-transform">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 18L18 20L22 16M12 15C8.68629 15 6 12.3137 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9C18 9.88071 17.7973 10.7163 17.4328 11.4654M2 20.5C2 19.1193 2.59566 17.7953 3.6967 16.7973C4.7977 15.7993 6.27198 15.25 7.8 15.25H14" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Climb the rankings</h3>
                  <p className="text-gray-600">Upvote the best roasts, submit your own, and climb our leaderboard of top roasters.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial/social proof section */}
        <section className="bg-gray-900 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M26.2962 18.1419C26.2962 27.8981 18.3419 35.8524 8.58571 35.8524C8.58572 26.0962 16.54 18.1419 26.2962 18.1419Z" stroke="white"/>
              <path d="M51.4143 18.1419C51.4143 27.8981 43.46 35.8524 33.7038 35.8524C33.7038 26.0962 41.6581 18.1419 51.4143 18.1419Z" stroke="white"/>
            </svg>
          </div>
          
          <div className="max-w-6xl mx-auto px-6 md:px-16 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Join 25,000+ people who love a good roast</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-800 p-6 rounded-xl">
                    <p className="text-lg mb-4">"I never thought I'd willingly ask strangers to insult me, but here I am, addicted to this app. The roasts are savage but so creative!"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">JD</div>
                      <div>
                        <p className="font-medium">Jessica D.</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F97316"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-6 rounded-xl">
                    <p className="text-lg mb-4">"My roast went viral and now my friends won't stop quoting it. This app is dangerously fun and oddly therapeutic."</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">MT</div>
                      <div>
                        <p className="font-medium">Mike T.</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F97316"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 relative">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-1 rounded-2xl shadow-xl rotate-1">
                  <div className="bg-gray-900 rounded-xl p-8 -rotate-1">
                    <h3 className="text-2xl font-bold mb-6">Create your account</h3>
                    <p className="text-gray-300 mb-8">Sign up in under 60 seconds and join the roasting revolution.</p>
                    
                    <Link href="/register">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full py-6 rounded-lg text-lg font-medium">
                        Sign up for free
                      </Button>
                    </Link>
                    
                    <div className="mt-6 flex items-center gap-2 justify-center">
                      <p className="text-gray-400 text-sm">Already have an account?</p>
                      <Link href="/login" className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                        Log in
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 opacity-20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-orange-500 opacity-20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-lg rotate-6 shadow-sm mr-3">
                  <Flame className="h-5 w-5 text-white rotate-[-6deg]" />
                </div>
                <span className="text-lg font-bold text-gray-900">roastme</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">The platform where humor meets honesty. Get ready to laugh, cringe, and maybe even learn something about yourself.</p>
              <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} RoastMe. All rights reserved.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link href="/discover" className="text-gray-600 hover:text-orange-500 text-sm">Discover</Link></li>
                  <li><Link href="/leaderboard" className="text-gray-600 hover:text-orange-500 text-sm">Leaderboard</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-orange-500 text-sm">How it works</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-orange-500 text-sm">Pricing</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-600 hover:text-orange-500 text-sm">About us</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-orange-500 text-sm">Careers</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-orange-500 text-sm">Blog</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-orange-500 text-sm">Press</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-600 hover:text-orange-500 text-sm">Privacy Policy</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-orange-500 text-sm">Terms of Service</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-orange-500 text-sm">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
