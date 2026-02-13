import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContainer, authStyles } from '../components/AuthContainer';
import { RootStackParamList } from '../navigation/types';
import { useRegisterMutation } from '../hooks/useAuthMutations';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [phone, setPhone] = useState('+90 555 555 55 55');
  const [password, setPassword] = useState('pistol');

  const registerMutation = useRegisterMutation();

  const onRegister = () => {
    registerMutation.mutate({ email, phone, password });
  };

  return (
    <AuthContainer>
      <Text style={authStyles.title}>Sign Up</Text>
      <Text style={authStyles.subtitle}>Create your account in a minute</Text>

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

      <Text style={authStyles.label}>Phone Number</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="+90 5xx xxx xx xx"
        placeholderTextColor="#9CA3AF"
        style={authStyles.input}
        keyboardType="phone-pad"
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

      <TouchableOpacity activeOpacity={0.9} style={authStyles.primaryBtn} onPress={onRegister}>
        {registerMutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={authStyles.primaryBtnText}>Create Account</Text>
        )}
      </TouchableOpacity>

      {registerMutation.isError && (
        <Text style={{ color: '#DC2626', marginTop: 10, textAlign: 'center' }}>
          Register failed. (Demo API)
        </Text>
      )}

      {registerMutation.isSuccess && (
        <Text style={{ color: '#059669', marginTop: 10, textAlign: 'center' }}>
          Register success (React Query + Zustand + Storage)
        </Text>
      )}

      <View style={authStyles.footerRow}>
        <Text style={authStyles.footerText}>Already have an account?</Text>
        <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('Login')}>
          <Text style={authStyles.linkText}> Login</Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
}
