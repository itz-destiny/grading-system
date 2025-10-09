'use client';

import {useState, useEffect} from 'react';
import {FirebaseApp} from 'firebase/app';
import {Firestore} from 'firebase/firestore';
import {Auth} from 'firebase/auth';
import {initializeFirebase} from '@/firebase';
import {FirebaseProvider} from './provider';

// This is a client-only wrapper that ensures Firebase is initialized only once.
export function FirebaseClientProvider({children}: {children: React.ReactNode}) {
  const [firebase, setFirebase] = useState<{
    app: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
  } | null>(null);

  useEffect(() => {
    const instances = initializeFirebase();
    setFirebase(instances);
  }, []);

  if (!firebase) {
    // You can render a loading state here if needed
    return null;
  }

  return (
    <FirebaseProvider
      app={firebase.app}
      firestore={firebase.firestore}
      auth={firebase.auth}
    >
      {children}
    </FirebaseProvider>
  );
}
