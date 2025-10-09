'use server';

import {collection, addDoc} from 'firebase/firestore';
import {errorEmitter} from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';
import {initializeFirebase} from '@/firebase';
import {PlaceHolderImages} from '@/lib/placeholder-images';

export async function addStudent(name: string): Promise<{
  success: boolean;
  message: string;
  studentId?: string;
}> {
  if (!name.trim()) {
    return {success: false, message: 'Student name cannot be empty.'};
  }

  const {firestore} = initializeFirebase();

  const randomAvatar =
    PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];

  const studentData = {
    name,
    avatar: randomAvatar.id,
  };

  try {
    const docRef = await addDoc(collection(firestore, 'students'), studentData);
    // Since we are using real-time listeners on the client, we don't need revalidatePath.
    // The client UI will update automatically.
    return {
      success: true,
      message: 'Student added successfully.',
      studentId: docRef.id,
    };
  } catch (error) {
    console.error('Error adding student:', error);
    // In a real app, you might want to create and emit a more specific error.
    // For now, we'll return a generic error message.
    return {
      success: false,
      message: 'Failed to add student. Please check permissions.',
    };
  }
}
