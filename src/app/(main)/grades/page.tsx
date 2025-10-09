'use client';

import {PageHeader} from '@/components/page-header';
import {GradeSheet} from './components/grade-sheet';

export default function GradesPage() {
  return (
    <>
      <PageHeader
        title="Grade Input"
        description="Enter and update student grades for each assignment."
      />
      <div className="p-4 sm:p-6 md:p-8">
        <GradeSheet />
      </div>
    </>
  );
}
