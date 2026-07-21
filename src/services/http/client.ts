import { ApiError } from './ApiError';
import { mockRequest } from './mockAdapter';

const API_MODE = process.env.API_MODE ?? 'mock';
const API_BASE_URL = process.env.API_BASE_URL ?? '';

async function request<T>(method: string, path: string): Promise<T> {
  if (API_MODE === 'mock') {
    return mockRequest<T>(method, path);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  return (await response.json()) as T;
}

export const http = {
  get: <T>(path: string) => request<T>('GET', path),
};
