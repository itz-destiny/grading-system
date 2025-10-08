'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import type {Student, Assignment, Grade} from '@/lib/types';
import {useState, useTransition} from 'react';
import {updateGrades} from '../actions';
import {useToast} from '@/hooks/use-toast';

interface GradeSheetProps {
  students: Student[];
  assignments: Assignment[];
  initialGrades: Grade[];
}

export function GradeSheet({
  students,
  assignments,
  initialGrades,
}: GradeSheetProps) {
  const {toast} = useToast();
  const [isPending, startTransition] = useTransition();
  const [grades, setGrades] = useState<Record<string, string>>(() => {
    const gradeMap: Record<string, string> = {};
    initialGrades.forEach(g => {
      gradeMap[`${g.studentId}-${g.assignmentId}`] = String(g.score);
    });
    return gradeMap;
  });

  const handleGradeChange = (
    studentId: string,
    assignmentId: string,
    score: string
  ) => {
    setGrades(prev => ({
      ...prev,
      [`${studentId}-${assignmentId}`]: score,
    }));
  };

  const handleSaveChanges = () => {
    startTransition(async () => {
      const gradesToUpdate: Record<string, number> = {};
      for (const key in grades) {
        const score = parseFloat(grades[key]);
        if (!isNaN(score)) {
          gradesToUpdate[key] = score;
        }
      }

      try {
        const result = await updateGrades(gradesToUpdate);
        toast({
          title: 'Success',
          description: result.message,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update grades.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Sheet</CardTitle>
        <CardDescription>
          Click on a cell to enter or edit a grade.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-auto">
          <Table className="min-w-max">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-card z-10 w-[200px]">
                  Student
                </TableHead>
                {assignments.map(assignment => (
                  <TableHead key={assignment.id} className="text-center">
                    {assignment.name}
                    <br />
                    <span className="text-xs text-muted-foreground font-normal">
                      (out of {assignment.maxPoints})
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium sticky left-0 bg-card z-10 w-[200px]">
                    {student.name}
                  </TableCell>
                  {assignments.map(assignment => {
                    const gradeKey = `${student.id}-${assignment.id}`;
                    return (
                      <TableCell key={assignment.id}>
                        <Input
                          type="number"
                          placeholder="-"
                          value={grades[gradeKey] ?? ''}
                          onChange={e =>
                            handleGradeChange(
                              student.id,
                              assignment.id,
                              e.target.value
                            )
                          }
                          className="w-24 text-center mx-auto"
                          max={assignment.maxPoints}
                          min={0}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={handleSaveChanges} disabled={isPending}>
          {isPending ? 'Saving...' : 'Save All Changes'}
        </Button>
      </CardFooter>
    </Card>
  );
}
