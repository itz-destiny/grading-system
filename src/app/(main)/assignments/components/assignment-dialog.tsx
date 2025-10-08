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
import {useFormState, useFormStatus} from 'react-dom';
import {addAssignment, type FormState} from '../actions';
import {useEffect, useRef, useState} from 'react';
import {useToast} from '@/hooks/use-toast';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';
import {CalendarIcon} from 'lucide-react';
import {format} from 'date-fns';
import {Calendar} from '@/components/ui/calendar';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const {pending} = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Adding...' : 'Add Assignment'}
    </Button>
  );
}

export function AddAssignmentDialog({children}: {children: React.ReactNode}) {
  const [state, formAction] = useFormState(addAssignment, initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const formRef = useRef<HTMLFormElement>(null);
  const {toast} = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: state.message,
        });
        setIsOpen(false);
        formRef.current?.reset();
        setDate(undefined);
      }
    }
  }, [state, toast]);

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
        <form action={formAction} ref={formRef} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" className="col-span-3" required />
          </div>
          {state.errors?.name && (
            <p className="text-sm text-destructive col-start-2 col-span-3 -mt-2">
              {state.errors.name.join(', ')}
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
              className="col-span-3"
              required
            />
          </div>
          {state.errors?.maxPoints && (
            <p className="text-sm text-destructive col-start-2 col-span-3 -mt-2">
              {state.errors.maxPoints.join(', ')}
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
            <input
              type="hidden"
              name="dueDate"
              value={date ? date.toISOString() : ''}
            />
          </div>
           {state.errors?.dueDate && (
            <p className="text-sm text-destructive col-start-2 col-span-3 -mt-2">
              {state.errors.dueDate.join(', ')}
            </p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
