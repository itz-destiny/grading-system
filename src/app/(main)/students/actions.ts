'use server';

import { z } from 'zod';

const studentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
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

  // This is where you would add the student to a database.
  // Since we are using mock data, we will just log it.
  console.log(`Adding student: ${name}`);

  return {
    success: true,
    message: `Student "${name}" added successfully.`,
  };
}
