import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { ACTIVITY_TYPE } from '@/lib/progress';

const schema = z.object({
  name: z.string().min(2, 'Course name is required'),
  activityType: z.enum([ACTIVITY_TYPE.TRAINING, ACTIVITY_TYPE.TEST, ACTIVITY_TYPE.PROJECT]),
  targetDate: z.string().optional(),
  resourceLink: z
    .string()
    .optional()
    .refine((v) => !v || /^https?:\/\/.+/.test(v), { message: 'Enter a valid URL starting with http(s)://' }),
});

export function CourseFormDialog({ open, onOpenChange, course, onSubmit, isLoading }) {
  const isEdit = !!course;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', activityType: ACTIVITY_TYPE.TRAINING, targetDate: '', resourceLink: '' },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: course?.name || '',
        activityType: course?.activityType || ACTIVITY_TYPE.TRAINING,
        targetDate: course?.targetDate ? course.targetDate.slice(0, 10) : '',
        resourceLink: course?.resourceLink || '',
      });
    }
  }, [open, course, reset]);

  function submit(values) {
    onSubmit({
      ...values,
      targetDate: values.targetDate || null,
      resourceLink: values.resourceLink || null,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit course' : 'Add course'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the curriculum item details.' : 'Add a new item to the training curriculum.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Course name</Label>
            <Input id="name" placeholder="e.g. DAX Essentials" {...register('name')} />
            {errors.name && <p className="text-xs text-rose">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="activityType">Activity type</Label>
            <Controller
              control={control}
              name="activityType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="activityType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ACTIVITY_TYPE).map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="targetDate">Target date (optional)</Label>
            <Input id="targetDate" type="date" {...register('targetDate')} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="resourceLink">Resource link (optional)</Label>
            <Input id="resourceLink" placeholder="https://…" {...register('resourceLink')} />
            {errors.resourceLink && <p className="text-xs text-rose">{errors.resourceLink.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving…' : isEdit ? 'Save changes' : 'Add course'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
