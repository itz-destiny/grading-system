import {PageHeader} from '@/components/page-header';
import {students, assignments, grades, rubric} from '@/lib/data';
import {StudentReportCard} from './components/student-report-card';

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Student Reports"
        description="View individual student performance and generate AI-powered feedback."
      />
      <div className="p-4 sm:p-6 md:p-8 grid gap-6">
        {students.map(student => {
          const studentGrades = grades.filter(g => g.studentId === student.id);
          const gradesWithDetails = studentGrades.map(grade => {
            const assignment = assignments.find(a => a.id === grade.assignmentId);
            return {
              ...grade,
              assignmentName: assignment?.name ?? 'Unknown Assignment',
              maxPoints: assignment?.maxPoints ?? 0,
            };
          });

          return (
            <StudentReportCard
              key={student.id}
              student={student}
              grades={gradesWithDetails}
              rubric={rubric}
            />
          );
        })}
      </div>
    </>
  );
}
