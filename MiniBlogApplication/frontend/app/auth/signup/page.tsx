'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { useApi } from '@/hooks/useApi';
import { SignupRequest, AuthResponse } from '@/types';

export default function SignupPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { execute, loading } = useApi<AuthResponse>({
    showSuccessToast: true,
    showErrorToast: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupRequest>();

  const onSubmit = async (data: SignupRequest) => {
    const response = await execute('POST', '/auth/signup', data);
    
    if (response?.data) {
      setAuth(response.data.user, response.data.token);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="animated-border-card pulse-glow">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Join MiniBlog! 🎉
            </h2>
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full px-4 py-3 bg-gray-900/50 rounded-lg border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                Name (Optional)
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="w-full px-4 py-3 bg-gray-900/50 rounded-lg border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className="w-full px-4 py-3 bg-gray-900/50 rounded-lg border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full px-6 py-4 rounded-xl font-bold text-lg text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 group-hover:scale-110 transition-transform duration-300"></span>
              <span className="relative">{loading ? 'Creating account...' : '🎉 Sign up'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
