import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input, Label } from '@/components/ui/input';

const baseFields = {
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
};

const createSchema = z.object({
  ...baseFields,
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const editSchema = z.object({
  ...baseFields,
  password: z.union([z.string().length(0), z.string().min(6, 'Password must be at least 6 characters')]).optional(),
});

export function CandidateFormDialog({ open, onOpenChange, candidate, onSubmit, isLoading }) {
  const isEdit = !!candidate;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEdit ? editSchema : createSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  useEffect(() => {
    if (open) {
      reset({ name: candidate?.name || '', email: candidate?.email || '', password: '' });
    }
  }, [open, candidate, reset]);

  function submit(values) {
    const payload = { name: values.name, email: values.email };
    if (values.password) payload.password = values.password;
    onSubmit(payload);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit candidate' : 'Add candidate'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update this candidate\'s details.' : 'Enroll a new candidate in the programme.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="e.g. Ananya Rao" {...register('name')} />
            {errors.name && <p className="text-xs text-rose">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@company.com" {...register('email')} />
            {errors.email && <p className="text-xs text-rose">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">{isEdit ? 'New password (optional)' : 'Password'}</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
            {errors.password && <p className="text-xs text-rose">{errors.password.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving…' : isEdit ? 'Save changes' : 'Add candidate'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
