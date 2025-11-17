export interface User {
  id: number;
  email: string;
  name?: string;
  createdAt: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
}

export interface UpdateBlogRequest {
  title: string;
  content: string;
}

export interface AIQueryRequest {
  question: string;
}

export interface AIQueryResponse {
  answer: string;
  source: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  setBlogs: (blogs: Blog[]) => void;
  addBlog: (blog: Blog) => void;
  updateBlog: (id: number, blog: Blog) => void;
  removeBlog: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
