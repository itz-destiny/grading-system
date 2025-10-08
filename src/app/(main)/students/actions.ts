'use server';

import {z} from 'zod';
import {revalidatePath} from 'next/cache';

const studentSchema = z.object({
  name: z.string().min(2, {message: 'Name must be at least 2 characters.'}),
});

export type FormState = {
  message: string;
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
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Here you would typically add the student to your database.
  // For this demo, we'll just log it to the console.
  console.log('New student added:', validatedFields.data.name);

  // Revalidate the path to see the new student (if data source was updated)
  revalidatePath('/students');

  return {message: 'Successfully added student.'};
}
