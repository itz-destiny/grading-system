'use client';

import {useState, useEffect, useContext} from 'react';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import {FirebaseContext} from '@/firebase/provider';

export const useUser = () => {
  const firebaseContext = useContext(FirebaseContext);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseContext) {
      // Firebase context is not available yet.
      // This can happen during initial render or if the provider is not set up correctly.
      setLoading(false); // Set loading to false as we can't determine auth state.
      return;
    }

    const auth = getAuth(firebaseContext.app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseContext]);

  return {user, loading};
};
