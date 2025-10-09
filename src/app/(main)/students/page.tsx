'use client';

import {PageHeader} from '@/components/page-header';
import {Button} from '@/components/ui/button';
import {getStudentAverage} from '@/lib/helpers';
import {PlusCircle} from 'lucide-react';
import {StudentsTable} from './components/students-table';
import {AddStudentDialog} from './components/student-dialog';
import type {Student} from '@/lib/types';
import {PlaceHolderImages} from '@/lib/placeholder-images';
import {useData} from '@/context/data-provider';

export default function StudentsPage() {
  const {students, addStudent, grades, assignments} = useData();

  const handleAddStudent = (name: string) => {
    const randomAvatar =
      PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];
    const newStudent: Student = {
      id: `student-${Date.now()}`,
      name,
      avatar: randomAvatar.id,
    };
    addStudent(newStudent);
  };

  const studentsWithGrades =
    students?.map(student => ({
      ...student,
      averageGrade: getStudentAverage(student.id, grades, assignments),
    })) ?? [];

  return (
    <>
      <PageHeader title="Students" description="Manage your enrolled students.">
        <AddStudentDialog onAddStudent={handleAddStudent}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </AddStudentDialog>
      </PageHeader>
      <div className="p-4 sm:p-6 md:p-8">
        <StudentsTable data={studentsWithGrades} />
      </div>
    </>
  );
}
