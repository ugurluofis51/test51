import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export const useLoginMutation = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (_data, variables) => {
      await setUser({ email: variables.email });
    },
  });
};

export const useRegisterMutation = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: async (_data, variables) => {
      await setUser({ email: variables.email });
    },
  });
};
