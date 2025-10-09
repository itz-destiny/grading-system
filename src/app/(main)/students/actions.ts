'use server';

import {collection, addDoc} from 'firebase/firestore';
import {z} from 'zod';
import {errorEmitter} from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';
import {initializeFirebase} from '@/firebase';
import {PlaceHolderImages} from '@/lib/placeholder-images';

const studentSchema = z.object({
  name: z.string().min(2, {message: 'Name must be at least 2 characters.'}),
});

export type FormState = {
  message: string;
  success: boolean;
  errors?: {
    name?: string[];
  };
};

export async function addStudent(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  const validatedFields = studentSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to add student.',
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { name } = validatedFields.data;

  const {firestore} = initializeFirebase();

  const randomAvatar =
    PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];

  const studentData = {
    name,
    avatar: randomAvatar.id,
  };

  try {
    const docRef = await addDoc(collection(firestore, 'students'), studentData);
    return {
      success: true,
      message: `Student "${name}" added successfully.`,
    };
  } catch (error) {
    // This is not a security rule error, but a general one.
    // We will emit a generic error that can be handled if needed,
    // but for now we just log it and return a failure state.
    console.error('Error adding student:', error);
     return {
      success: false,
      message: 'Failed to add student. Please try again.',
    };
  }
}
