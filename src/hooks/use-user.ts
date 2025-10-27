'use client';

import {useUser as useFirebaseUser} from '@/firebase';

export const useUser = () => {
  const {user, isUserLoading: loading} = useFirebaseUser();
  return {user, loading};
};
