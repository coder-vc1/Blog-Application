'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '@/hooks/useApi';
import { AIQueryRequest, AIQueryResponse } from '@/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  source?: string;
}

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { execute, loading } = useApi<AIQueryResponse>();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AIQueryRequest>();

  const onSubmit = async (data: AIQueryRequest) => {
    setMessages((prev) => [...prev, { role: 'user', content: data.question }]);

    const response = await execute('POST', '/ai/query', data);
    
    if (response?.data) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.data.answer,
          source: response.data.source,
        },
      ]);
    }

    reset();
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Main Chat Card */}
        <div className="animated-border-card pulse-glow mb-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">🤖 AI Support Assistant</h1>
            <p className="text-gray-300 text-sm md:text-base">
              Ask me anything about the Mini Blog Platform! I'm here to help.
            </p>
          </div>

          {/* Knowledge Base Info */}
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <p className="text-xs md:text-sm text-gray-300">
              <strong className="text-blue-400">Knowledge Base:</strong> This AI assistant is powered by our comprehensive
              knowledge base covering platform features, authentication, blog management, and more.
            </p>
          </div>

          {/* Chat Messages */}
          <div className="mb-6 max-h-96 overflow-y-auto p-4 bg-gray-900/30 rounded-xl space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <p className="text-base md:text-lg mb-4">👋 Hello! How can I help you today?</p>
                <div className="text-left max-w-md mx-auto space-y-2 text-xs md:text-sm">
                  <p className="font-semibold text-purple-300">Try asking:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>"How do I sign up?"</li>
                    <li>"How to create a blog?"</li>
                    <li>"Who can see my blogs?"</li>
                    <li>"How to edit or delete a blog?"</li>
                    <li>"What features are available?"</li>
                  </ul>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-sm md:text-base ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.source && (
                    <p className="text-xs mt-2 opacity-75">Source: {message.source}</p>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex gap-3">
              <input
                {...register('question', { required: 'Please enter a question' })}
                type="text"
                placeholder="Type your question here..."
                className="flex-1 px-4 py-3 bg-gray-900/50 rounded-xl border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm text-sm md:text-base"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:scale-110 transition-transform duration-300"></span>
                <span className="relative">{loading ? 'Sending...' : 'Send'}</span>
              </button>
            </div>
            {errors.question && (
              <p className="text-sm text-red-400">{errors.question.message}</p>
            )}
          </form>
        </div>

        {/* FAQ Section */}
        <div className="animated-border-card">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3 text-sm md:text-base text-gray-300">
            <details className="border-b border-gray-700/50 pb-3">
              <summary className="font-semibold cursor-pointer hover:text-purple-400 transition-colors">
                How do I sign up?
              </summary>
              <p className="mt-2 ml-4 text-gray-400">
                Click the "Sign Up" button and provide your email and password. You can also add your name optionally.
              </p>
            </details>
            <details className="border-b border-gray-700/50 pb-3">
              <summary className="font-semibold cursor-pointer hover:text-purple-400 transition-colors">
                How do I create a blog?
              </summary>
              <p className="mt-2 ml-4 text-gray-400">
                After logging in, click "Create Blog", enter your title and content, then publish!
              </p>
            </details>
            <details className="border-b border-gray-700/50 pb-3">
              <summary className="font-semibold cursor-pointer hover:text-purple-400 transition-colors">
                Can I edit my blogs?
              </summary>
              <p className="mt-2 ml-4 text-gray-400">
                Yes! Only you can edit or delete your own blogs. Look for the Edit and Delete buttons on your blog posts.
              </p>
            </details>
            <details className="pb-3">
              <summary className="font-semibold cursor-pointer hover:text-purple-400 transition-colors">
                Who can see my blogs?
              </summary>
              <p className="mt-2 ml-4 text-gray-400">
                All published blogs are visible to everyone, including visitors who are not logged in.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
