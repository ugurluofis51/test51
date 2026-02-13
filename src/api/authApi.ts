import { api } from './client';

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export const authApi = {
  async login(payload: LoginPayload) {
    const response = await api.post('/login', {
      email: payload.email,
      password: payload.password,
    });
    return response.data;
  },
  async register(payload: RegisterPayload) {
    // reqres demo API only requires email/password; other fields stay app-side.
    const response = await api.post('/register', {
      email: payload.email,
      password: payload.password,
    });
    return response.data;
  },
};
