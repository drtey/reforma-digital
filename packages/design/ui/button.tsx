import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  "group/button relative isolate overflow-hidden inline-flex shrink-0 items-center justify-center rounded-full border-0 bg-clip-padding text-base leading-[1.2] font-medium whitespace-nowrap no-underline cursor-pointer transition-transform duration-160 ease-[var(--ease-brand)] outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:scale-[0.96] disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground disabled:opacity-100 disabled:before:opacity-0 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-[radial-gradient(ellipse_60%_65%_at_50%_110%,#ffbe0b_0%,#ff7a1a_38%,rgba(223,23,23,0.9)_68%,rgba(223,23,23,0)_100%)] before:bg-[position:50%_0] before:bg-[length:max(100%,134px)_100%] before:bg-no-repeat motion-safe:before:translate-y-[55%] before:opacity-0 motion-safe:before:transition-[opacity,transform] motion-safe:before:duration-200 motion-safe:before:ease-linear hover:before:translate-y-0 hover:before:opacity-100 motion-safe:hover:before:duration-[280ms,420ms] motion-safe:hover:before:ease-[var(--ease-brand)]',
        outline:
          'bg-background text-foreground ring-1 ring-border before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-muted before:opacity-0 motion-safe:before:transition-opacity motion-safe:before:duration-200 hover:before:opacity-100 aria-expanded:before:opacity-100',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'bg-transparent text-inherit before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-current before:opacity-0 motion-safe:before:transition-opacity motion-safe:before:duration-200 hover:before:opacity-[0.08] aria-expanded:before:opacity-[0.08]',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'min-h-11 gap-2 px-5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'min-h-13 gap-2 px-5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-11',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-13',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        size: 'icon-lg',
        className: 'disabled:bg-primary disabled:text-primary-foreground/45',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
