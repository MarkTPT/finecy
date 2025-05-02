import 'react-native-url-polyfill/auto';
import { createClient, type SupportedStorage } from '@supabase/supabase-js';
import type { Database } from './types/supabase.database';
import { storage } from './storage';

const mmkvSupabaseSupportedStorage = {
  setItem: (key, data) => storage.set(key, data),
  getItem: (key) => storage.getString(key) ?? null,
  removeItem: (key) => storage.delete(key),
} satisfies SupportedStorage;

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  {
    auth: {
      storage: mmkvSupabaseSupportedStorage,
      detectSessionInUrl: false,
    },
  },
);
