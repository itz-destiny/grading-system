import {PageHeader} from '@/components/page-header';
import {students, assignments, grades} from '@/lib/data';
import {GradeSheet} from './components/grade-sheet';

export default function GradesPage() {
  return (
    <>
      <PageHeader
        title="Grade Input"
        description="Enter and update student grades for each assignment."
      />
      <div className="p-4 sm:p-6 md:p-8">
        <GradeSheet
          students={students}
          assignments={assignments}
          initialGrades={grades}
        />
      </div>
    </>
  );
}
