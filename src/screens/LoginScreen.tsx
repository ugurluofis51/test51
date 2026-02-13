import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { AuthContainer, authStyles } from '../components/AuthContainer';
import { RootStackParamList } from '../navigation/types';
import { useLoginMutation } from '../hooks/useAuthMutations';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const loginMutation = useLoginMutation();

  const onLogin = () => {
    loginMutation.mutate({ email, password });
  };

  return (
    <AuthContainer>
      <Text style={authStyles.title}>Welcome Back 👋</Text>
      <Text style={authStyles.subtitle}>Sign in to continue</Text>

      <Text style={authStyles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        placeholderTextColor="#9CA3AF"
        style={authStyles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={authStyles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        placeholderTextColor="#9CA3AF"
        style={authStyles.input}
        secureTextEntry
      />

      <TouchableOpacity activeOpacity={0.9} style={authStyles.primaryBtn} onPress={onLogin}>
        {loginMutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={authStyles.primaryBtnText}>Login</Text>
        )}
      </TouchableOpacity>

      {loginMutation.isError && (
        <Text style={{ color: '#DC2626', marginTop: 10, textAlign: 'center' }}>
          Login failed. Check credentials.
        </Text>
      )}

      {loginMutation.isSuccess && (
        <Text style={{ color: '#059669', marginTop: 10, textAlign: 'center' }}>
          Login success (React Query + Zustand + Storage)
        </Text>
      )}

      <View style={authStyles.footerRow}>
        <Text style={authStyles.footerText}>Don’t have an account?</Text>
        <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('Register')}>
          <Text style={authStyles.linkText}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
}
