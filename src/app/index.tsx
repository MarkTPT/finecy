import { useAuth } from '@/providers/AuthProvider';
import { Redirect } from 'expo-router';

export default function Index() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/auth/sign-in" />;
  }

  return <Redirect href="/(app)/(tabs)" />;
}
