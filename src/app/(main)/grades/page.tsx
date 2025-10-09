'use client';

import { PageHeader } from '@/components/page-header';
import { GradeSheet } from './components/grade-sheet';
import { GradeSummaryTable } from './components/grade-summary-table';
import { useState } from 'react';

export default function GradesPage() {
  const [showSummary, setShowSummary] = useState(false);

  const handleSaveChanges = () => {
    setShowSummary(false); // Reset to force re-render with new data
    setTimeout(() => setShowSummary(true), 0);
  };

  return (
    <>
      <PageHeader
        title="Grade Input"
        description="Enter and update student grades for each assignment."
      />
      <div className="p-4 sm:p-6 md:p-8 grid gap-8">
        <GradeSheet onSave={handleSaveChanges} />
        {showSummary && <GradeSummaryTable />}
      </div>
    </>
  );
}
