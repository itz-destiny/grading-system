'use client';

import {useEffect} from 'react';
import {useToast} from '@/hooks/use-toast';
import {errorEmitter} from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';

export function FirebaseErrorListener() {
  const {toast} = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      console.error('Firestore Permission Error:', error.toDetailedString());
      toast({
        variant: 'destructive',
        title: 'Permission Denied',
        description:
          'You do not have permission to perform this action. Check the console for details.',
      });
      // In a real app, you might want to throw the error to an error boundary
      // For this dev environment, we'll just log it.
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
