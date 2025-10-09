'use client';

import {PageHeader} from '@/components/page-header';
import {Button} from '@/components/ui/button';
import {assignments, grades, students as mockStudents} from '@/lib/data';
import {getStudentAverage} from '@/lib/helpers';
import {PlusCircle} from 'lucide-react';
import {StudentsTable} from './components/students-table';
import {AddStudentDialog} from './components/student-dialog';
import type {Student} from '@/lib/types';
import {useState} from 'react';
import {PlaceHolderImages} from '@/lib/placeholder-images';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);

  const handleAddStudent = (name: string) => {
    const randomAvatar =
      PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];
    const newStudent: Student = {
      id: `student-${Date.now()}`,
      name,
      avatar: randomAvatar.id,
    };
    setStudents(prevStudents => [...prevStudents, newStudent]);
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
