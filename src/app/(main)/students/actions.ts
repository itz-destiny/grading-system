'use client';

import {collection, addDoc, Firestore} from 'firebase/firestore';
import {revalidatePath} from 'next/cache';
import {firestore} from '@/firebase/index.ts';
import {errorEmitter} from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';
import type {Student} from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';


export async function addStudent(
  name: string,
  db: Firestore
): Promise<void> {

  if (!name) {
    throw new Error('Student name cannot be empty.');
  }

  const randomAvatar = PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];

  const studentData = {
    name,
    avatar: randomAvatar.id,
  };

  try {
    const docRef = await addDoc(collection(db, 'students'), studentData);
    console.log('Student added with ID: ', docRef.id);
    // In a real-world scenario with server-side rendering and actions,
    // you might use revalidatePath('/students') here.
    // Since we are using real-time listeners, the UI will update automatically.
  } catch (e: any) {
    const permissionError = new FirestorePermissionError({
      path: '/students',
      operation: 'create',
      requestResourceData: studentData,
    });
    errorEmitter.emit('permission-error', permissionError);
    // Also re-throw the original error if you want to handle it further up the chain
    throw e;
  }
}
