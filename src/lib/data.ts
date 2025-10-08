import type {Student, Assignment, Grade} from '@/lib/types';

export const students: Student[] = [
  {id: '1', name: 'Alex Johnson', avatar: 'student1'},
  {id: '2', name: 'Maria Garcia', avatar: 'student2'},
  {id: '3', name: 'James Smith', avatar: 'student3'},
  {id: '4', name: 'Patricia Williams', avatar: 'student4'},
  {id: '5', name: 'Robert Brown', avatar: 'student5'},
];

export const assignments: Assignment[] = [
  {
    id: 'A1',
    name: 'History Essay',
    dueDate: '2024-05-10',
    maxPoints: 100,
  },
  {
    id: 'A2',
    name: 'Math Quiz 1',
    dueDate: '2024-05-15',
    maxPoints: 50,
  },
  {
    id: 'A3',
    name: 'Science Project Proposal',
    dueDate: '2024-05-20',
    maxPoints: 30,
  },
  {
    id: 'A4',
    name: 'Literature Review',
    dueDate: '2024-06-01',
    maxPoints: 100,
  },
];

export const grades: Grade[] = [
  // Alex Johnson's grades
  {studentId: '1', assignmentId: 'A1', score: 85},
  {studentId: '1', assignmentId: 'A2', score: 45},
  {studentId: '1', assignmentId: 'A3', score: 25},
  {studentId: '1', assignmentId: 'A4', score: 90},

  // Maria Garcia's grades
  {studentId: '2', assignmentId: 'A1', score: 92},
  {studentId: '2', assignmentId: 'A2', score: 48},
  {studentId: '2', assignmentId: 'A3', score: 28},
  {studentId: '2', assignmentId: 'A4', score: 95},

  // James Smith's grades
  {studentId: '3', assignmentId: 'A1', score: 78},
  {studentId: '3', assignmentId: 'A2', score: 35},
  {studentId: '3', assignmentId: 'A3', score: 20},
  {studentId: '3', assignmentId: 'A4', score: 82},

  // Patricia Williams's grades
  {studentId: '4', assignmentId: 'A1', score: 88},
  {studentId: '4', assignmentId: 'A2', score: 42},
  {studentId: '4', assignmentId: 'A3', score: 22},
  {studentId: '4', assignmentId: 'A4', score: 85},

  // Robert Brown's grades
  {studentId: '5', assignmentId: 'A1', score: 95},
  {studentId: '5', assignmentId: 'A2', score: 50},
  {studentId: '5', assignmentId: 'A3', score: 30},
];

export const rubric = `
Grading Rubric:
- A (90-100%): Excellent work that exceeds expectations. Demonstrates a thorough understanding of the material.
- B (80-89%): Good work that meets expectations. Demonstrates a solid understanding of the material.
- C (70-79%): Satisfactory work. Demonstrates a basic understanding of the material.
- D (60-69%): Below average work. Shows some misunderstanding of the material.
- F (Below 60%): Unsatisfactory work. Shows a significant lack of understanding.
`;
