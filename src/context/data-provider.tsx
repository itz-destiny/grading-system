'use client';

import React, {createContext, useContext, useState, ReactNode} from 'react';
import type {Student, Assignment, Grade} from '@/lib/types';
import {
  students as mockStudents,
  assignments as mockAssignments,
  grades as mockGrades,
  rubric as mockRubric,
} from '@/lib/data';

interface DataContextType {
  students: Student[];
  assignments: Assignment[];
  grades: Grade[];
  rubric: string;
  addStudent: (student: Student) => void;
  updateGrades: (newGrades: Grade[]) => void;
  // Add other update functions as needed
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({children}: {children: ReactNode}) => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [grades, setGrades] = useState<Grade[]>(mockGrades);
  const [rubric, setRubric] = useState<string>(mockRubric);

  const addStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };
  
  const updateGrades = (newGrades: Grade[]) => {
    setGrades(newGrades);
  };


  return (
    <DataContext.Provider value={{students, assignments, grades, rubric, addStudent, updateGrades}}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
