export interface Student {
  id: string;
  name: string;
  avatar: string;
}

export interface Assignment {
  id:string;
  name: string;
  dueDate: string;
  maxPoints: number;
}

export interface Grade {
  studentId: string;
  assignmentId: string;
  score: number;
}
