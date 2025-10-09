import type {Student, Assignment, Grade} from './types';
import {parseISO} from 'date-fns';

export const getStudentAverage = (
  studentId: string,
  grades: Grade[],
  assignments: Assignment[]
) => {
  const studentGrades = grades.filter(grade => grade.studentId === studentId);
  const relevantAssignments = assignments.filter(assignment =>
    studentGrades.some(grade => grade.assignmentId === assignment.id)
  );

  if (relevantAssignments.length === 0) return 0;

  const totalPoints = studentGrades.reduce((acc, grade) => {
    const assignment = assignments.find(a => a.id === grade.assignmentId);
    if (!assignment) return acc;
    return acc + (grade.score / assignment.maxPoints) * 100;
  }, 0);

  return totalPoints / relevantAssignments.length;
};

export const getClassAverage = (grades: Grade[], assignments: Assignment[]) => {
  if (grades.length === 0) return 0;
  const totalPercentage = grades.reduce((acc, grade) => {
    const assignment = assignments.find(a => a.id === grade.assignmentId);
    if (!assignment) return acc;
    return acc + (grade.score / assignment.maxPoints) * 100;
  }, 0);
  return totalPercentage / grades.length;
};

export const getAssignmentAverage = (
  assignmentId: string,
  grades: Grade[],
  assignment: Assignment
) => {
  const assignmentGrades = grades.filter(
    grade => grade.assignmentId === assignmentId
  );
  if (assignmentGrades.length === 0) return 0;

  const totalScore = assignmentGrades.reduce(
    (acc, grade) => acc + grade.score,
    0
  );
  return (totalScore / (assignmentGrades.length * assignment.maxPoints)) * 100;
};

export const getAssignmentAveragesForChart = (
  grades: Grade[],
  assignments: Assignment[]
) => {
  const sortedAssignments = [...assignments].sort(
    (a, b) => parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime()
  );

  return sortedAssignments.map(assignment => {
    const average = getAssignmentAverage(assignment.id, grades, assignment);
    return {
      name: assignment.name,
      average: parseFloat(average.toFixed(1)),
    };
  });
};

export const getLetterGrade = (percentage: number): string => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
};
