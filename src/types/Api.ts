export interface ApiResponse<T = unknown> {
  status: "success" | "error";
  message?: string;
  data?: T;
  errors?: ApiError[];
}

export interface ApiError extends Error {
  code: string;
  message: string;
  field?: string;
}
