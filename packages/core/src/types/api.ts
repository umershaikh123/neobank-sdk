/**
 * Standard API response envelope used by all endpoints
 */
export interface ApiResponse<T> {
  code: number;
  message: string;
  detail: string | null;
  data: T | null;
}
