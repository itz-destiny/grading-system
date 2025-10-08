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
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {PlaceHolderImages} from '@/lib/placeholder-images';
import type {Student} from '@/lib/types';

export type StudentWithGrade = Student & {
  averageGrade: number;
};

export const columns: ColumnDef<StudentWithGrade>[] = [
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
    cell: ({row}) => {
      const student = row.original;
      const avatarPlaceholder = PlaceHolderImages.find(
        p => p.id === student.avatar
      );

      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={avatarPlaceholder?.imageUrl}
              alt={student.name}
              data-ai-hint={avatarPlaceholder?.imageHint}
            />
            <AvatarFallback>
              {student.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{student.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'averageGrade',
    header: ({column}) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Overall Grade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({row}) => {
      const amount = parseFloat(row.getValue('averageGrade'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}%</div>;
    },
  },
  {
    id: 'actions',
    cell: ({row}) => {
      const student = row.original;

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
                onClick={() => navigator.clipboard.writeText(student.id)}
              >
                Copy student ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                Delete student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
