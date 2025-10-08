'use server';

/**
 * @fileOverview Generates a brief performance overview for each student based on their grades and rubric data.
 *
 * - generateStudentPerformanceOverview - A function that generates the student performance overview.
 * - GenerateStudentPerformanceOverviewInput - The input type for the generateStudentPerformanceOverview function.
 * - GenerateStudentPerformanceOverviewOutput - The return type for the generateStudentPerformanceOverview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudentPerformanceOverviewInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  grades: z.record(z.number()).describe('A record of grades for the student, with assignment names as keys and grades as values.'),
  rubric: z.string().describe('The rubric used for grading the assignments.'),
});
export type GenerateStudentPerformanceOverviewInput = z.infer<
  typeof GenerateStudentPerformanceOverviewInputSchema
>;

const GenerateStudentPerformanceOverviewOutputSchema = z.object({
  performanceOverview: z
    .string()
    .describe('A brief overview of the student\'s performance.'),
});
export type GenerateStudentPerformanceOverviewOutput = z.infer<
  typeof GenerateStudentPerformanceOverviewOutputSchema
>;

export async function generateStudentPerformanceOverview(
  input: GenerateStudentPerformanceOverviewInput
): Promise<GenerateStudentPerformanceOverviewOutput> {
  return generateStudentPerformanceOverviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudentPerformanceOverviewPrompt',
  input: {schema: GenerateStudentPerformanceOverviewInputSchema},
  output: {schema: GenerateStudentPerformanceOverviewOutputSchema},
  prompt: `You are a helpful teacher providing feedback to students.

  Based on the student's grades and the rubric used, provide a brief performance overview for the student.

  Student Name: {{{studentName}}}
  Grades: {{{grades}}}
  Rubric: {{{rubric}}}
  Performance Overview:`, // The performance overview is what the LLM will be generating.
});

const generateStudentPerformanceOverviewFlow = ai.defineFlow(
  {
    name: 'generateStudentPerformanceOverviewFlow',
    inputSchema: GenerateStudentPerformanceOverviewInputSchema,
    outputSchema: GenerateStudentPerformanceOverviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
