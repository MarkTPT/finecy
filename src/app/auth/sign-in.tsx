import Loader from '@/components/Loader';
import Fonts from '@/constants/Fonts';
import { supabase } from '@/lib/supabase';
import Button from '@/components/Button';
import BodyText from '@/components/BodyText';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';

export default function SignInPage() {
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);

    console.log(`[AuthScreen] Logging in`);

    const authResponse = await supabase.auth.signInAnonymously();

    setLoading(false);

    if (authResponse?.error) {
      Toast.show({
        type: 'error',

        text1: 'Error while logging in',
        text2: authResponse.error.message,
      });

      console.error(`[AuthScreen] Error: ${authResponse.error}`);

      return;
    }

    router.replace('/(app)/(tabs)');
  };

  return (
    <>
      <StatusBar style="light" animated />

      <View
        style={{
          backgroundColor: '#1B2128',

          flex: 1,

          alignItems: 'center',

          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 25,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Inter700,
              fontSize: 30,
              color: 'white',
            }}
          >
            Finecy
          </Text>
        </View>

        <View style={{ width: '100%', marginBottom: 75 }}>
          <Button text="Log in" textColor="white" color="#5AA4FE" />

          <Button
            style={{ marginTop: 10 }}
            text="Continue as Guest"
            onPress={onLogin}
            borderColor="#D0D5DD"
            textColor="#1B2128"
            color="white"
            leftNode={
              <FontAwesome5 name="user-secret" size={22} color="#1B2128" />
            }
          />

          <Button
            style={{ marginTop: 10 }}
            text="Sign up"
            textColor="white"
            color="#1B2128"
            borderColor="#5AA4FE"
          />
        </View>

        <View style={{ marginBottom: 35 }}>
          <BodyText
            style={{
              textAlign: 'center',
              fontSize: 15,
              color: '#D0D5DD',
            }}
          >
            By signing in, you agree to our{' '}
            <BodyText style={{ color: '#5AA4FE', fontSize: 15 }}>
              Terms of Service
            </BodyText>{' '}
            and{' '}
            <BodyText style={{ color: '#5AA4FE', fontSize: 15 }}>
              Privacy Policy
            </BodyText>
            .
          </BodyText>
        </View>

        {loading && <Loader text="Logging in" />}
      </View>
    </>
  );
}
