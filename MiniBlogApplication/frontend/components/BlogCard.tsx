'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Blog } from '@/types';
import { useAuthStore } from '@/store/authStore';
import { useBlogStore } from '@/store/blogStore';
import { useApi } from '@/hooks/useApi';

interface BlogCardProps {
  blog: Blog;
  onUpdate: () => void;
}

export default function BlogCard({ blog, onUpdate }: BlogCardProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { removeBlog } = useBlogStore();
  const { execute, loading } = useApi();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isAuthor = isAuthenticated && user?.id === blog.author.id;

  const handleDelete = async () => {
    const response = await execute('DELETE', `/blogs/${blog.id}`);
    if (response) {
      removeBlog(blog.id);
      setShowDeleteConfirm(false);
      onUpdate();
    }
  };

  const getPreview = (content: string) => {
    const maxLength = 120;
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="h-full">
      <div className="animated-border-card h-full flex flex-col hover:scale-[1.02] transition-all duration-300 pulse-glow">
        <div className="flex-1 mb-3">
          <h3
            className="text-lg md:text-xl font-bold text-white mb-2 cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300 line-clamp-2"
            onClick={() => router.push(`/blogs/${blog.id}`)}
          >
            {blog.title}
          </h3>
          <p className="text-gray-300 text-xs md:text-sm line-clamp-3 leading-relaxed">{getPreview(blog.content)}</p>
        </div>

        <div className="border-t border-gray-700/50 pt-3 mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-semibold text-purple-300 text-xs md:text-sm truncate">
                {blog.author.name || blog.author.email}
              </p>
              <p className="text-gray-400 text-xs">{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => router.push(`/blogs/${blog.id}`)}
              className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
            >
              📖 Read More
            </button>

            {isAuthor && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => router.push(`/blogs/${blog.id}/edit`)}
                  className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={loading}
                  className="px-3 py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white text-xs font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 disabled:opacity-50"
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="animated-border-card max-w-sm w-full">
            <h3 className="text-xl md:text-2xl font-bold gradient-text mb-2">Delete Blog</h3>
            <p className="text-gray-300 text-sm mb-4">
              Are you sure you want to delete this blog? This action cannot be undone.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white text-sm font-semibold transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Deleting...' : '🗑️ Delete'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
                className="px-4 py-2 rounded-lg glass hover:glass-strong text-white text-sm font-semibold transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
