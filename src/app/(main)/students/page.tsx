import {PageHeader} from '@/components/page-header';
import {Button} from '@/components/ui/button';
import {students, grades, assignments} from '@/lib/data';
import {getStudentAverage} from '@/lib/helpers';
import {PlusCircle} from 'lucide-react';
import {StudentsTable} from './components/students-table';
import {AddStudentDialog} from './components/student-dialog';

export default function StudentsPage() {
  const studentsWithGrades = students.map(student => ({
    ...student,
    averageGrade: getStudentAverage(student.id, grades, assignments),
  }));

  return (
    <>
      <PageHeader
        title="Students"
        description="Manage your enrolled students."
      >
        <AddStudentDialog>
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
