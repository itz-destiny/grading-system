'use client';

import {PageHeader} from '@/components/page-header';
import {Button} from '@/components/ui/button';
import {grades, assignments} from '@/lib/data';
import {getStudentAverage} from '@/lib/helpers';
import {PlusCircle, LoaderCircle} from 'lucide-react';
import {StudentsTable} from './components/students-table';
import {AddStudentDialog} from './components/student-dialog';
import {useCollection} from '@/firebase';
import type {Student} from '@/lib/types';
import {Skeleton} from '@/components/ui/skeleton';

export default function StudentsPage() {
  const {
    data: students,
    loading,
    error,
  } = useCollection<Student>('students');

  const studentsWithGrades =
    students?.map(student => ({
      ...student,
      averageGrade: getStudentAverage(student.id, grades, assignments),
    })) ?? [];

  return (
    <>
      <PageHeader title="Students" description="Manage your enrolled students.">
        <AddStudentDialog>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </AddStudentDialog>
      </PageHeader>
      <div className="p-4 sm:p-6 md:p-8">
        {loading && (
          <div className="rounded-md border bg-card p-4 space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}
        {error && (
          <div
            className="bg-destructive/10 text-destructive p-4 rounded-md"
            role="alert"
          >
            <h4 className="font-semibold">Error loading students</h4>
            <p>{error.message}</p>
          </div>
        )}
        {!loading && !error && <StudentsTable data={studentsWithGrades} />}
      </div>
    </>
  );
}
