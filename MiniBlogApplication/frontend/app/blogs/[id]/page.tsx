'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { useAuthStore } from '@/store/authStore';
import { useApi } from '@/hooks/useApi';
import { Blog } from '@/types';

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user, isAuthenticated } = useAuthStore();
  const { execute, loading } = useApi<Blog>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  const fetchBlog = async () => {
    const response = await execute('GET', `/blogs/${params.id}`);
    if (response?.data) {
      setBlog(response.data);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
          <p className="mt-6 text-gray-300 text-lg">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animated-border-card max-w-2xl mx-auto text-center py-12">
          <p className="text-gray-300 text-xl mb-4">Blog not found</p>
          <button
            onClick={() => router.push('/')}
            className="relative px-6 py-3 rounded-lg font-semibold text-white overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:scale-110 transition-transform duration-300"></span>
            <span className="relative">← Go back to home</span>
          </button>
        </div>
      </div>
    );
  }

  const isAuthor = isAuthenticated && user?.id === blog.author.id;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="animated-border-card">
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-6">{blog.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-400 border-b border-gray-700/50 pb-6">
              <div>
                <p className="font-semibold text-purple-300 text-base mb-1">
                  By {blog.author.name || blog.author.email}
                </p>
                <p>{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</p>
                {blog.updatedAt !== blog.createdAt && (
                  <p className="text-xs mt-1">
                    Updated: {format(new Date(blog.updatedAt), 'MMMM dd, yyyy')}
                  </p>
                )}
              </div>

              {isAuthor && (
                <button
                  onClick={() => router.push(`/blogs/${blog.id}/edit`)}
                  className="relative px-6 py-3 rounded-lg font-semibold text-white overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:scale-110 transition-transform duration-300"></span>
                  <span className="relative">✏️ Edit Blog</span>
                </button>
              )}
            </div>
          </div>

          <div className="prose max-w-none">
            <ReactMarkdown className="markdown-content">
              {blog.content}
            </ReactMarkdown>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <button
              onClick={() => router.push('/')}
              className="relative px-6 py-3 rounded-lg font-semibold text-white overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:scale-110 transition-transform duration-300"></span>
              <span className="relative">← Back to all blogs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
