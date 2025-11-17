import { create } from 'zustand';
import { BlogState, Blog } from '@/types';

export const useBlogStore = create<BlogState>((set) => ({
  blogs: [],
  loading: false,
  error: null,

  setBlogs: (blogs: Blog[]) => {
    set({ blogs, error: null });
  },

  addBlog: (blog: Blog) => {
    set((state) => ({
      blogs: [blog, ...state.blogs],
      error: null,
    }));
  },

  updateBlog: (id: number, updatedBlog: Blog) => {
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      ),
      error: null,
    }));
  },

  removeBlog: (id: number) => {
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog.id !== id),
      error: null,
    }));
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));
