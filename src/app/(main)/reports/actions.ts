'use server';

import {generateStudentPerformanceOverview} from '@/ai/flows/generate-student-performance-overview';
import {z} from 'zod';

const reportSchema = z.object({
  studentName: z.string(),
  grades: z.string(), // Keep as string, it's already stringified
  rubric: z.string(),
});

export type FormState = {
  overview?: string;
  error?: string;
};

export async function generateReport(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = reportSchema.safeParse({
      studentName: formData.get('studentName'),
      grades: formData.get('grades'),
      rubric: formData.get('rubric'),
    });

    if (!validatedFields.success) {
      return {error: 'Invalid input data.'};
    }

    const {studentName, grades, rubric} = validatedFields.data;

    const result = await generateStudentPerformanceOverview({
      studentName,
      gradesJSON: grades, // Pass the JSON string directly
      rubric,
    });

    if (result.performanceOverview) {
      return {overview: result.performanceOverview};
    } else {
      return {error: 'Failed to generate performance overview.'};
    }
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : String(e);
    return {error: `An unexpected error occurred: ${errorMessage}`};
  }
}
