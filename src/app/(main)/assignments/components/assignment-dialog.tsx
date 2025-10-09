'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useEffect, useRef, useState, useTransition} from 'react';
import {useToast} from '@/hooks/use-toast';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';
import {CalendarIcon} from 'lucide-react';
import {format} from 'date-fns';
import {Calendar} from '@/components/ui/calendar';
import {useData} from '@/context/data-provider';
import type {Assignment} from '@/lib/types';
import {z} from 'zod';

const assignmentSchema = z.object({
  name: z.string().min(2, {message: 'Name must be at least 2 characters.'}),
  maxPoints: z.coerce
    .number()
    .min(1, {message: 'Max points must be at least 1.'}),
  dueDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Invalid date format.',
  }),
});

type FormErrors = {
  name?: string[];
  maxPoints?: string[];
  dueDate?: string[];
};

export function AddAssignmentDialog({children}: {children: React.ReactNode}) {
  const {addAssignment} = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState('');
  const [maxPoints, setMaxPoints] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [errors, setErrors] = useState<FormErrors>({});

  const formRef = useRef<HTMLFormElement>(null);
  const {toast} = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validatedFields = assignmentSchema.safeParse({
      name,
      maxPoints,
      dueDate: date ? date.toISOString() : '',
    });

    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    
    setErrors({});

    startTransition(() => {
      const newAssignment: Assignment = {
        id: `assignment-${Date.now()}`,
        ...validatedFields.data,
      };
      addAssignment(newAssignment);

      toast({
        title: 'Success',
        description: 'Successfully added assignment.',
      });

      setIsOpen(false);
    });
  };

  useEffect(() => {
    if (!isOpen) {
      formRef.current?.reset();
      setName('');
      setMaxPoints('');
      setDate(undefined);
      setErrors({});
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Assignment</DialogTitle>
          <DialogDescription>
            Enter the details for the new assignment.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          {errors.name && (
            <p className="text-sm text-destructive col-start-2 col-span-3 -mt-2">
              {errors.name.join(', ')}
            </p>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maxPoints" className="text-right">
              Max Points
            </Label>
            <Input
              id="maxPoints"
              name="maxPoints"
              type="number"
              value={maxPoints}
              onChange={e => setMaxPoints(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          {errors.maxPoints && (
            <p className="text-sm text-destructive col-start-2 col-span-3 -mt-2">
              {errors.maxPoints.join(', ')}
            </p>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {errors.dueDate && (
            <p className="text-sm text-destructive col-start-2 col-span-3 -mt-2">
              {errors.dueDate.join(', ')}
            </p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Adding...' : 'Add Assignment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
