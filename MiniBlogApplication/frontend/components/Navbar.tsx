'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass-strong shadow-lg' : 'glass-strong'
    } border-b border-purple-500/20`}>
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text hover:scale-110 transition-transform duration-300">
              📝 MiniBlog
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <Link
              href="/"
              className="relative text-gray-300 hover:text-white font-medium transition-all duration-300 group text-xs sm:text-sm md:text-base"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/blogs/create"
                  className="relative text-gray-300 hover:text-white font-medium transition-all duration-300 group text-xs sm:text-sm md:text-base hidden sm:block"
                >
                  Create Blog
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                
                {/* Mobile - Show only icon for Create Blog */}
                <Link
                  href="/blogs/create"
                  className="sm:hidden text-gray-300 hover:text-white font-medium transition-all duration-300 text-xs"
                >
                  ✍️
                </Link>
                
                <Link
                  href="/support"
                  className="relative text-gray-300 hover:text-white font-medium transition-all duration-300 group text-xs sm:text-sm md:text-base hidden sm:block"
                >
                  AI Support
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>

                {/* Mobile - Show only icon for AI Support */}
                <Link
                  href="/support"
                  className="sm:hidden text-gray-300 hover:text-white font-medium transition-all duration-300 text-xs"
                >
                  🤖
                </Link>

                <div className="flex items-center gap-2 sm:gap-4 ml-2 sm:ml-4">
                  {/* User info - Hidden on mobile */}
                  <div className="glass px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hidden md:block">
                    <span className="text-gray-300 text-xs sm:text-sm">
                      👋 <span className="gradient-text font-semibold">{user?.name || user?.email}</span>
                    </span>
                  </div>
                  
                  {/* User emoji only on mobile */}
                  <div className="md:hidden glass px-2 py-1.5 rounded-lg">
                    <span className="text-sm">👋</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="relative px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg font-semibold text-white overflow-hidden group text-xs sm:text-sm"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 group-hover:scale-110 transition-transform duration-300"></span>
                    <span className="relative">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/support"
                  className="relative text-gray-300 hover:text-white font-medium transition-all duration-300 group text-xs sm:text-sm md:text-base hidden sm:block"
                >
                  AI Support
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>

                {/* Mobile - Show only icon */}
                <Link
                  href="/support"
                  className="sm:hidden text-gray-300 hover:text-white font-medium transition-all duration-300 text-xs"
                >
                  🤖
                </Link>
                
                <Link
                  href="/auth/login"
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-300 text-xs sm:text-sm md:text-base"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="relative px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-lg font-semibold text-white overflow-hidden group text-xs sm:text-sm"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 group-hover:scale-110 transition-transform duration-300"></span>
                  <span className="relative">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
