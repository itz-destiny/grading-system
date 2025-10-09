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
import {useState, useTransition, useEffect} from 'react';
import {useToast} from '@/hooks/use-toast';
import {useData} from '@/context/data-provider';

interface GradeSheetProps {
  onSave: () => void;
}

export function GradeSheet({ onSave }: GradeSheetProps) {
  const {students, assignments, grades: initialGrades, updateGrades} = useData();
  const {toast} = useToast();
  const [isPending, startTransition] = useTransition();

  const [localGrades, setLocalGrades] = useState<Record<string, string>>(() => {
    const gradeMap: Record<string, string> = {};
    initialGrades.forEach(g => {
      gradeMap[`${g.studentId}-${g.assignmentId}`] = String(g.score);
    });
    return gradeMap;
  });

  useEffect(() => {
    const gradeMap: Record<string, string> = {};
    initialGrades.forEach(g => {
      gradeMap[`${g.studentId}-${g.assignmentId}`] = String(g.score);
    });
    setLocalGrades(gradeMap);
  }, [initialGrades]);

  const handleGradeChange = (
    studentId: string,
    assignmentId: string,
    score: string
  ) => {
    setLocalGrades(prev => ({
      ...prev,
      [`${studentId}-${assignmentId}`]: score,
    }));
  };

  const handleSaveChanges = () => {
    startTransition(() => {
      const newGrades: Grade[] = [];
      const updatedGradeKeys = new Set<string>();

      for (const key in localGrades) {
        const [studentId, assignmentId] = key.split('-');
        const scoreValue = localGrades[key];
        // Only add if there is a score
        if (scoreValue !== '' && scoreValue !== null && scoreValue !== undefined) {
          const score = parseFloat(scoreValue);
          if (!isNaN(score)) {
            newGrades.push({ studentId, assignmentId, score });
            updatedGradeKeys.add(`${studentId}-${assignmentId}`);
          }
        }
      }

      // Add back any initial grades that were not in the localGrades map
      initialGrades.forEach(grade => {
        if (!updatedGradeKeys.has(`${grade.studentId}-${grade.assignmentId}`)) {
          newGrades.push(grade);
        }
      });

      updateGrades(newGrades);
      onSave();
      
      toast({
        title: 'Success',
        description: 'Grades updated successfully.',
      });
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
                          value={localGrades[gradeKey] ?? ''}
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
