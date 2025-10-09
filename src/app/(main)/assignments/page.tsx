'use client';

import {PageHeader} from '@/components/page-header';
import {Button} from '@/components/ui/button';
import {getAssignmentAverage} from '@/lib/helpers';
import {PlusCircle} from 'lucide-react';
import {AssignmentsTable} from './components/assignments-table';
import {AddAssignmentDialog} from './components/assignment-dialog';
import {useData} from '@/context/data-provider';

export default function AssignmentsPage() {
  const {assignments, grades} = useData();

  const assignmentsWithAverages = assignments.map(assignment => ({
    ...assignment,
    classAverage: getAssignmentAverage(assignment.id, grades, assignment),
  }));

  return (
    <>
      <PageHeader
        title="Assignments"
        description="Manage your class assignments."
      >
        <AddAssignmentDialog>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Assignment
          </Button>
        </AddAssignmentDialog>
      </PageHeader>
      <div className="p-4 sm:p-6 md:p-8">
        <AssignmentsTable data={assignmentsWithAverages} />
      </div>
    </>
  );
}
