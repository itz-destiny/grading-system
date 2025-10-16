'use client';

import React, {createContext, useContext} from 'react';
import type {FirebaseApp} from 'firebase/app';
import type {Firestore} from 'firebase/firestore';
import type {Auth} from 'firebase/auth';

interface FirebaseContextType {
  app: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  app: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}) => {
  return (
    <FirebaseContext.Provider value={props}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
}

export const useFirebaseApp = () => useFirebase().app;
export const useFirestore = () => useFirebase().firestore;
export const useAuth = () => useFirebase().auth;
