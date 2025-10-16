'use client';

import {useEffect, useState, ReactNode} from 'react';
import {initializeFirebase} from '@/firebase';
import {FirebaseProvider} from '@/firebase/provider';
import type {FirebaseApp} from 'firebase/app';
import type {Firestore} from 'firebase/firestore';
import type {Auth} from 'firebase/auth';
import {LoaderCircle} from 'lucide-react';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

interface FirebaseInstances {
  app: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}

export function FirebaseClientProvider({children}: FirebaseClientProviderProps) {
  const [firebase, setFirebase] = useState<FirebaseInstances | null>(null);

  useEffect(() => {
    const init = async () => {
      const instances = await initializeFirebase();
      setFirebase(instances);
    };
    init();
  }, []);

  if (!firebase) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoaderCircle className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <FirebaseProvider
      app={firebase.app}
      auth={firebase.auth}
      firestore={firebase.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
