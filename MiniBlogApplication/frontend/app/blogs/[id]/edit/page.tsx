'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { useBlogStore } from '@/store/blogStore';
import { useApi } from '@/hooks/useApi';
import { UpdateBlogRequest, Blog } from '@/types';
import toast from 'react-hot-toast';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, user } = useAuthStore();
  const { updateBlog } = useBlogStore();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { execute: fetchBlogExecute } = useApi<Blog>({
    showErrorToast: true,
  });
  
  const { execute: updateBlogExecute, loading: updateLoading } = useApi<Blog>({
    showSuccessToast: true,
    showErrorToast: true,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateBlogRequest>();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to edit blogs');
      router.push('/auth/login');
      return;
    }
    if (params.id) {
      fetchBlog();
    }
  }, [isAuthenticated, params.id]);

  const fetchBlog = async () => {
    setIsLoading(true);
    const response = await fetchBlogExecute('GET', `/blogs/${params.id}`);
    
    if (response?.data) {
      if (response.data.author.id !== user?.id) {
        toast.error('You can only edit your own blogs');
        router.push('/');
        return;
      }
      
      setBlog(response.data);
      setValue('title', response.data.title);
      setValue('content', response.data.content);
    } else {
      toast.error('Blog not found');
      router.push('/');
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: UpdateBlogRequest) => {
    if (!blog) return;
    
    const response = await updateBlogExecute('PUT', `/blogs/${params.id}`, data);
    
    if (response?.data) {
      updateBlog(response.data.id, response.data);
      router.push(`/blogs/${params.id}`);
    }
  };

  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4"></div>
          <p className="text-gray-300 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="animated-border-card pulse-glow">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-8">Edit Blog ✏️</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label htmlFor="title" className="block text-lg font-semibold text-white mb-3">
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
                className="w-full px-5 py-4 bg-gray-900/50 rounded-xl border border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your blog title"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                  <span>⚠️</span> {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-lg font-semibold text-white mb-3">
                Blog Content *
              </label>
              <textarea
                id="content"
                rows={16}
                {...register('content', {
                  required: 'Content is required',
                })}
                className="w-full px-5 py-4 bg-gray-900/50 rounded-xl border border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 transition-all duration-300 resize-none backdrop-blur-sm"
                placeholder="Write your blog content here... (Markdown supported)"
              />
              {errors.content && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                  <span>⚠️</span> {errors.content.message}
                </p>
              )}
              <p className="mt-3 text-sm text-gray-400 flex items-center gap-2">
                <span>💡</span> You can use Markdown formatting in your content
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={updateLoading}
                className="flex-1 relative px-8 py-4 rounded-xl font-bold text-lg text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 group-hover:scale-110 transition-transform duration-300"></span>
                <span className="relative flex items-center justify-center gap-2">
                  {updateLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <span>💾</span> Update Blog
                    </>
                  )}
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => router.push(`/blogs/${params.id}`)}
                disabled={updateLoading}
                className="flex-1 px-8 py-4 rounded-xl font-bold text-lg glass hover:glass-strong text-white transition-all duration-300 border-2 border-gray-600/50 hover:border-gray-500 disabled:opacity-50"
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
