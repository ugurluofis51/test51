import { api } from './client';

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  phone: string;
  password: string;
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
    // reqres demo API requires email/password; phone stays app-side.
    const response = await api.post('/register', {
      email: payload.email,
      password: payload.password,
    });
    return response.data;
  },
};
