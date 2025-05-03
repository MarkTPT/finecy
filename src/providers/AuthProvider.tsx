import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/types/supabase.database';
import { Session } from '@supabase/supabase-js';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthData = {
  session: Session | null;
  profile: Tables<'profiles'> | null;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  loading: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthData['session']>(null);
  const [profile, setProfile] = useState<AuthData['profile']>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setProfile(data);
      }

      setSession(session);

      setLoading(false);
    });

    supabase.auth.getSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return ctx;
};
