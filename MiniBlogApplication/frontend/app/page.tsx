'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useBlogStore } from '@/store/blogStore';
import { useApi } from '@/hooks/useApi';
import BlogCard from '@/components/BlogCard';
import { Blog } from '@/types';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { blogs, setBlogs, loading, setLoading, error } = useBlogStore();
  const { execute } = useApi<Blog[]>();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const response = await execute('GET', '/blogs');
    if (response?.data) {
      setBlogs(response.data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Much smaller */}
      <div className="relative overflow-hidden py-8 md:py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 gradient-text">
              Welcome to MiniBlog
            </h1>
            <p className="text-sm md:text-base text-gray-300 mb-5 max-w-2xl mx-auto px-4">
              Share your thoughts, read amazing stories, and connect with writers around the world ✨
            </p>
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
                <button
                  onClick={() => router.push('/auth/signup')}
                  className="relative px-5 py-2.5 rounded-lg font-semibold text-sm text-white overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 group-hover:scale-110 transition-transform duration-300"></span>
                  <span className="relative">Get Started 🚀</span>
                </button>
                <button
                  onClick={() => router.push('/auth/login')}
                  className="px-5 py-2.5 rounded-lg font-semibold text-sm glass-strong hover:glass text-white transition-all duration-300 border-2 border-purple-500/50 hover:border-purple-400"
                >
                  Sign In
                </button>
              </div>
            )}
            {isAuthenticated && (
              <button
                onClick={() => router.push('/blogs/create')}
                className="relative px-5 py-2.5 rounded-lg font-semibold text-sm text-white overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 group-hover:scale-110 transition-transform duration-300"></span>
                <span className="relative">Create Your First Blog ✍️</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="mb-6">
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
              Latest Blogs
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full"></div>
          </div>
        </div>
        
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-purple-600 border-t-transparent"></div>
            <p className="mt-3 text-gray-300 text-sm">Loading blogs...</p>
          </div>
        )}

        {error && (
          <div className="glass-strong border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-center text-sm">
            {error}
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-12 glass-strong rounded-2xl">
            <p className="text-gray-300 text-base">No blogs yet. Be the first to create one! 🎉</p>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} onUpdate={fetchBlogs} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
