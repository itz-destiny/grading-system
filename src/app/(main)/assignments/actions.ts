'use server';

import {z} from 'zod';
import {revalidatePath} from 'next/cache';

const assignmentSchema = z.object({
  name: z.string().min(2, {message: 'Name must be at least 2 characters.'}),
  maxPoints: z.coerce
    .number()
    .min(1, {message: 'Max points must be at least 1.'}),
  dueDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Invalid date format.',
  }),
});

export type FormState = {
  message: string;
  errors?: {
    name?: string[];
    maxPoints?: string[];
    dueDate?: string[];
  };
};

export async function addAssignment(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = assignmentSchema.safeParse({
    name: formData.get('name'),
    maxPoints: formData.get('maxPoints'),
    dueDate: formData.get('dueDate'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to add assignment.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log('New assignment added:', validatedFields.data);

  revalidatePath('/assignments');

  return {message: 'Successfully added assignment.'};
}
