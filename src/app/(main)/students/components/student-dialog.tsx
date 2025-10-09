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
import {addStudent} from '../actions';
import {useEffect, useRef, useState, useTransition} from 'react';
import {useToast} from '@/hooks/use-toast';
import {useFirestore} from '@/firebase';

function SubmitButton({isPending}: {isPending: boolean}) {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending ? 'Adding...' : 'Add Student'}
    </Button>
  );
}

export function AddStudentDialog({children}: {children: React.ReactNode}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const {toast} = useToast();
  const firestore = useFirestore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) {
      toast({
        title: 'Error',
        description: 'Firestore is not available.',
        variant: 'destructive',
      });
      return;
    }
    if (!name.trim()) {
      toast({
        title: 'Error',
        description: 'Student name cannot be empty.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      try {
        await addStudent(name, firestore);
        toast({
          title: 'Success',
          description: `Student "${name}" has been added.`,
        });
        setIsOpen(false);
        setName('');
        formRef.current?.reset();
      } catch (error: any) {
        toast({
          title: 'Error Adding Student',
          description:
            error.message || 'An unexpected error occurred.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter the details for the new student. Click save when you're done.
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
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              required
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton isPending={isPending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
