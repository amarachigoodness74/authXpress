export interface LoginResponse {
  payload: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

export interface ForgotPasswordResponse {
  token: string;
}

export interface ErrorResponse {
  status?: string;
  error: string;
}

export interface SuccessResponse {
  status?: string;
  message: string;
}
