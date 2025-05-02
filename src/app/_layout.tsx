import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppState, View } from 'react-native';
import { supabase } from '@/lib/supabase';
import AuthProvider from '@/providers/AuthProvider';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Screen';
import ToastManager from 'toastify-react-native';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fontawesome
        await Font.loadAsync(FontAwesome5.font);
      } catch (e) {
        console.warn(`Error loading fontawesome icons: ${e}`);
      } finally {
        setIsAppReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (!isAppReady) {
      return;
    }

    // This tells the splash screen to hide immediately! If we call this after
    // `setIsAppReady`, then we may see a blank screen while the app is
    // loading its initial state and rendering its first pixels. So instead,
    // we hide the splash screen once we know the root view has already
    // performed layout.
    SplashScreen.hideAsync();
  }, [isAppReady]);

  return (
    <SafeAreaProvider>
      <ToastManager theme="dark" />

      <AuthProvider>
        {isAppReady && (
          <View
            onLayout={onLayoutRootView}
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
          >
            <Slot />
          </View>
        )}
      </AuthProvider>
    </SafeAreaProvider>
  );
}
