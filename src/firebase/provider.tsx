'use client';

import React, {createContext, useContext} from 'react';
import {FirebaseApp} from 'firebase/app';
import {Firestore} from 'firebase/firestore';
import {Auth} from 'firebase/auth';
import {FirebaseErrorListener} from '@/components/FirebaseErrorListener';

interface FirebaseContextType {
  app: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
}

const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  firestore: null,
  auth: null,
});

export const AppContext = createContext<FirebaseApp | null>(null);
export const FirestoreContext = createContext<Firestore | null>(null);
export const AuthContext = createContext<Auth | null>(null);

export const FirebaseProvider: React.FC<{
  app: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  children: React.ReactNode;
}> = ({app, firestore, auth, children}) => {
  return (
    <FirebaseContext.Provider value={{app, firestore, auth}}>
      <AppContext.Provider value={app}>
        <FirestoreContext.Provider value={firestore}>
          <AuthContext.Provider value={auth}>
            {children}
            <FirebaseErrorListener />
          </AuthContext.Provider>
        </FirestoreContext.Provider>
      </AppContext.Provider>
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
export const useFirebaseApp = () => useContext(AppContext);
export const useFirestore = () => useContext(FirestoreContext);
export const useAuth = () => useContext(AuthContext);