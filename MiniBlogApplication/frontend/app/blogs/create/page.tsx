'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { useBlogStore } from '@/store/blogStore';
import { useApi } from '@/hooks/useApi';
import { CreateBlogRequest, Blog } from '@/types';

export default function CreateBlogPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { addBlog } = useBlogStore();
  const { execute, loading } = useApi<Blog>({
    showSuccessToast: true,
    showErrorToast: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBlogRequest>();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: CreateBlogRequest) => {
    const response = await execute('POST', '/blogs', data);
    
    if (response?.data) {
      addBlog(response.data);
      router.push('/');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="animated-border-card pulse-glow">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-6">Create New Blog ✍️</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-base font-semibold text-white mb-2">
                Blog Title *
              </label>
              <input
                id="title"
                type="text"
                {...register('title', {
                  required: 'Title is required',
                  maxLength: {
                    value: 200,
                    message: 'Title must not exceed 200 characters',
                  },
                })}
                className="w-full px-4 py-3 bg-gray-900/50 rounded-xl border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm text-sm md:text-base"
                placeholder="Enter your blog title"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                  <span>⚠️</span> {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-base font-semibold text-white mb-2">
                Blog Content *
              </label>
              <textarea
                id="content"
                rows={12}
                {...register('content', {
                  required: 'Content is required',
                })}
                className="w-full px-4 py-3 bg-gray-900/50 rounded-xl border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400 transition-all duration-300 resize-none backdrop-blur-sm text-sm md:text-base"
                placeholder="Write your blog content here... (Markdown supported)"
              />
              {errors.content && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                  <span>⚠️</span> {errors.content.message}
                </p>
              )}
              <p className="mt-2 text-xs md:text-sm text-gray-400 flex items-center gap-2">
                <span>💡</span> You can use Markdown formatting in your content
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 relative px-6 py-3 rounded-xl font-bold text-base text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 group-hover:scale-110 transition-transform duration-300"></span>
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <span>🚀</span> Publish Blog
                    </>
                  )}
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/')}
                disabled={loading}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-base glass hover:glass-strong text-white transition-all duration-300 border-2 border-gray-600/50 hover:border-gray-500 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
