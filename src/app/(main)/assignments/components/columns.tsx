'use client';

import {ColumnDef} from '@tanstack/react-table';
import {MoreHorizontal, ArrowUpDown} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type {Assignment} from '@/lib/types';
import {format, parseISO} from 'date-fns';

export type AssignmentWithAverage = Assignment & {
  classAverage: number;
};

export const columns: ColumnDef<AssignmentWithAverage>[] = [
  {
    accessorKey: 'name',
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({row}) => {
      const date = parseISO(row.getValue('dueDate'));
      return <div>{format(date, 'PPP')}</div>;
    },
  },
  {
    accessorKey: 'maxPoints',
    header: () => <div className="text-right">Max Points</div>,
    cell: ({row}) => {
      return (
        <div className="text-right font-medium">
          {row.getValue('maxPoints')}
        </div>
      );
    },
  },
  {
    accessorKey: 'classAverage',
    header: () => <div className="text-right">Class Average</div>,
    cell: ({row}) => {
      const average = parseFloat(row.getValue('classAverage'));
      const formatted = `${average.toFixed(1)}%`;
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({row}) => {
      const assignment = row.original;
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(assignment.id)}
              >
                Copy assignment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit assignment</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                Delete assignment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
