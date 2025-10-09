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
import {useEffect, useRef, useState} from 'react';
import {useToast} from '@/hooks/use-toast';

export function AddStudentDialog({
  children,
  onAddStudent,
}: {
  children: React.ReactNode;
  onAddStudent: (name: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const {toast} = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.length < 2) {
      setError('Name must be at least 2 characters.');
      return;
    }
    
    onAddStudent(name);

    toast({
      title: 'Success',
      description: `Student "${name}" added successfully.`,
    });
    
    setIsOpen(false);
    setName('');
    setError('');
  };
  
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setError('');
    }
  }, [isOpen]);

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
          {error && (
            <p className="text-sm text-destructive col-start-2 col-span-3 -mt-2">
              {error}
            </p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Add Student</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
