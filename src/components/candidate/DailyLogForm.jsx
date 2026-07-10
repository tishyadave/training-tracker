import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label, Textarea } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const schema = z.object({
  courseId: z.string().min(1, 'Pick a task'),
  hoursWorked: z.coerce.number().positive('Enter hours greater than 0').max(24, 'That\u2019s more hours than a day has'),
  notes: z.string().optional(),
});

export function DailyLogForm({ courses = [], onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { courseId: '', hoursWorked: '', notes: '' },
  });

  function submit(values) {
    onSubmit(values, { onSuccess: () => reset({ courseId: '', hoursWorked: '', notes: '' }) });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log today's work</CardTitle>
        <CardDescription>Record time spent and notes for a task.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="courseId">Task</Label>
            <Controller
              control={control}
              name="courseId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="courseId">
                    <SelectValue placeholder="Choose a task…" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.courseId && <p className="text-xs text-rose">{errors.courseId.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="hoursWorked">Hours worked</Label>
            <Input id="hoursWorked" type="number" step="0.5" min="0" max="24" placeholder="e.g. 2.5" {...register('hoursWorked')} />
            {errors.hoursWorked && <p className="text-xs text-rose">{errors.hoursWorked.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea id="notes" placeholder="What did you work on?" rows={3} {...register('notes')} />
          </div>

          <Button type="submit" disabled={isLoading} className="self-start">
            {isLoading ? 'Submitting…' : 'Submit log'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
