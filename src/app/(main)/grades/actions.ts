'use server';

import {revalidatePath} from 'next/cache';

export async function updateGrades(
  data: Record<string, number>
): Promise<{message: string}> {
  
  // In a real app, you would validate and save this data to a database.
  // The `data` object format is { 'studentId-assignmentId': score }
  
  console.log('Updating grades:', data);

  revalidatePath('/grades');
  revalidatePath('/dashboard');
  revalidatePath('/students');
  revalidatePath('/assignments');
  revalidatePath('/reports');

  return {message: 'Grades updated successfully.'};
}
