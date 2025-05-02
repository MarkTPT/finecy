import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Slot } from 'expo-router';

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  return <Slot />;
}
