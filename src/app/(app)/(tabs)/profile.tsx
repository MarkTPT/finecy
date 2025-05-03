import Button from '@/components/Button';
import HeadlineText from '@/components/HeadlineText';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfilePage() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingTop: insets.top,

        flex: 1,
      }}
    >
      <View style={{ padding: 20 }}>
        <HeadlineText>Profile</HeadlineText>

        <Button
          text="Sign out"
          onPress={() => {
            supabase.auth.signOut();
            router.replace('/auth/sign-in');
          }}
          style={{ marginTop: 100 }}
        />
      </View>
    </View>
  );
}
