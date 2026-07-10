import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const VARIANTS = {
  primary: 'bg-forest text-white hover:bg-forest-hover shadow-sm',
  secondary: 'bg-white text-ink border border-hairline hover:bg-canvas',
  outline: 'bg-transparent text-ink border border-hairline hover:bg-canvas',
  ghost: 'bg-transparent text-ink-secondary hover:bg-canvas hover:text-ink',
  destructive: 'bg-rose text-white hover:bg-rose/90 shadow-sm',
  link: 'bg-transparent text-forest underline-offset-4 hover:underline p-0 h-auto',
};

const SIZES = {
  sm: 'h-8 px-3 text-sm rounded-md gap-1.5',
  md: 'h-9 px-4 text-sm rounded-md gap-2',
  lg: 'h-11 px-5 text-base rounded-lg gap-2',
  icon: 'h-9 w-9 rounded-md',
};

export const Button = forwardRef(function Button(
  { className, variant = 'primary', size = 'md', asChild = false, ...props },
  ref
) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    />
  );
});
