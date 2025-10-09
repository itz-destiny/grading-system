'use client';

import {useState, useEffect, useContext} from 'react';
import {User, onAuthStateChanged} from 'firebase/auth';
import {AuthContext} from '@/firebase/provider';

export function useUser() {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(auth?.currentUser ?? null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error('Auth state change error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth]);

  return {user, loading};
}
