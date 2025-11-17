import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { ApiResponse } from '@/types';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

interface UseApiOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useApi = <T = any,>(options: UseApiOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  
  const { token, logout } = useAuthStore();

  const {
    showSuccessToast = false,
    showErrorToast = true,
    onSuccess,
    onError,
  } = options;

  const execute = useCallback(
    async (
      method: Method,
      endpoint: string,
      requestData?: any,
      config?: AxiosRequestConfig
    ): Promise<ApiResponse<T> | null> => {
      setLoading(true);
      setError(null);

      try {
        const headers: any = {
          'Content-Type': 'application/json',
        };

        // CRITICAL: Add Authorization header if token exists
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
          console.log('Token added to request:', token.substring(0, 20) + '...'); // Debug log
        } else {
          console.warn('No token found in auth store!'); // Debug log
        }

        const response = await axios({
          method,
          url: `${API_BASE_URL}${endpoint}`,
          data: requestData,
          headers: {
            ...headers,
            ...config?.headers, // Merge any additional headers
          },
          ...config,
        });

        const apiResponse: ApiResponse<T> = response.data;
        setData(apiResponse.data);

        if (showSuccessToast && apiResponse.message) {
          toast.success(apiResponse.message);
        }

        if (onSuccess) {
          onSuccess(apiResponse.data);
        }

        return apiResponse;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'An unexpected error occurred';
        
        setError(errorMessage);

        if (showErrorToast) {
          toast.error(errorMessage);
        }

        if (err.response?.status === 401) {
          logout();
          toast.error('Session expired. Please login again.');
        }

        if (onError) {
          onError(err);
        }

        return null;
      } finally {
        setLoading(false);
      }
    },
    [token, logout, showSuccessToast, showErrorToast, onSuccess, onError]
  );

  return {
    execute,
    loading,
    error,
    data,
    setError,
  };
};
