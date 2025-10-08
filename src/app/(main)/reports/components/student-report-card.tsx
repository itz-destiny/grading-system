'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {PlaceHolderImages} from '@/lib/placeholder-images';
import type {Student} from '@/lib/types';
import {useFormState, useFormStatus} from 'react-dom';
import {generateReport, type FormState} from '../actions';
import {Sparkles, LoaderCircle} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

interface StudentReportCardProps {
  student: Student;
  grades: {
    studentId: string;
    assignmentId: string;
    score: number;
    assignmentName: string;
    maxPoints: number;
  }[];
  rubric: string;
}

const initialState: FormState = {};

function GenerateButton() {
  const {pending} = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="sm">
      {pending ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      {pending ? 'Generating...' : 'Generate Overview'}
    </Button>
  );
}

export function StudentReportCard({
  student,
  grades,
  rubric,
}: StudentReportCardProps) {
  const [state, formAction] = useFormState(generateReport, initialState);
  const avatarPlaceholder = PlaceHolderImages.find(p => p.id === student.avatar);
  const gradesForAI = grades.reduce(
    (acc, grade) => {
      acc[grade.assignmentName] = grade.score;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={avatarPlaceholder?.imageUrl}
            alt={student.name}
            data-ai-hint={avatarPlaceholder?.imageHint}
          />
          <AvatarFallback>
            {student.name
              .split(' ')
              .map(n => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <CardTitle>{student.name}</CardTitle>
          <CardDescription>
            Performance summary and grade breakdown.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-semibold mb-2">Grade Details</h3>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.length > 0 ? (
                  grades.map(grade => (
                    <TableRow key={grade.assignmentId}>
                      <TableCell className="font-medium">
                        {grade.assignmentName}
                      </TableCell>
                      <TableCell className="text-right">
                        {grade.score} / {grade.maxPoints}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      No grades entered yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">AI Performance Overview</h3>
          <div className="border rounded-lg p-4 bg-muted/30 min-h-[200px]">
            {state.overview && (
              <div className="text-sm whitespace-pre-wrap">
                {state.overview}
              </div>
            )}
            {state.error && (
              <Alert variant="destructive">
                <AlertTitle>Generation Failed</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            {!state.overview && !state.error && (
              <div className="text-sm text-muted-foreground">
                Click the "Generate Overview" button to get AI-powered feedback
                for this student.
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <form action={formAction}>
          <input type="hidden" name="studentName" value={student.name} />
          <input
            type="hidden"
            name="grades"
            value={JSON.stringify(gradesForAI)}
          />
          <input type="hidden" name="rubric" value={rubric} />
          <GenerateButton />
        </form>
      </CardFooter>
    </Card>
  );
}
