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
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Student, Assignment, Grade } from '@/lib/types';
import { getStudentAverage, getLetterGrade } from '@/lib/helpers';
import { useData } from '@/context/data-provider';

interface GradeSummary {
  student: Student;
  average: number;
  letterGrade: string;
}

export function GradeSummaryTable() {
  const { students, grades, assignments } = useData();

  const summaryData: GradeSummary[] = students.map(student => {
    const average = getStudentAverage(student.id, grades, assignments);
    const letterGrade = getLetterGrade(average);
    return {
      student,
      average,
      letterGrade,
    };
  }).sort((a, b) => b.average - a.average);

  const getBadgeVariant = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'default';
      case 'B':
        return 'secondary';
      case 'C':
        return 'outline';
      default:
        return 'destructive';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Summary</CardTitle>
        <CardDescription>
          Overall performance of each student after saving changes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="text-right">Overall Average</TableHead>
                <TableHead className="text-right">Letter Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summaryData.map(({ student, average, letterGrade }) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="text-right">{average.toFixed(1)}%</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getBadgeVariant(letterGrade)}>{letterGrade}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
