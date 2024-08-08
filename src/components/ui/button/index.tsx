import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export type TTypeButton = 'main' | 'ghost' | 'ghost-no-padding' | 'danger' | 'split';
type TVariant = 'primary' | 'secondary' | 'tertiary';
type TSize = 'default' | 'icon' | 'icon-circle' | 'large' | 'small' | 'extraLarge';

const buttonVariants = (typeButton?: TTypeButton) => {
  let variant = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary-hover hover:border-primary disabled:bg-muted disabled:text-grey-7 disabled:hover:border-muted',
    secondary:
      'border border-primary text-primary bg-background hover:bg-primary/20 disabled:border-muted disabled:hover:bg-background hover:border-primary disabled:hover:border-muted',
    tertiary:
      'border border-muted bg-background placeholder:text-muted-foreground hover:bg-accent disabled:hover:bg-background hover:border-primary disabled:hover:border-muted',
  };

  switch (typeButton) {
    case 'main':
      variant = {
        primary:
          'bg-primary text-primary-foreground disabled:text-grey-7 disabled:bg-muted hover:bg-primary-hover hover:border-primary disabled:active:border-none',
        secondary:
          'border border-primary text-primary bg-background disabled:border-muted disabled:hover:bg-background disabled:text-grey-7 hover:bg-primary/20 hover:border-primary disabled:active:border-none',
        tertiary:
          'border border-muted bg-background placeholder:text-muted-foreground hover:bg-accent disabled:hover:bg-background disabled:text-grey-7 text-grey-9 disabled:active:border-muted',
      };
      break;
    case 'ghost':
      variant = {
        primary:
          'text-primary disabled:hover:bg-background disabled:text-grey-7 hover:border-primary hover:bg-primary/20 disabled:active:border-none',
        secondary:
          'hover:bg-accent disabled:hover:bg-background disabled:text-grey-7 hover:border-primary text-grey-12 disabled:active:border-none',
        tertiary:
          'text-primary disabled:hover:bg-background disabled:text-grey-7 hover:border-primary hover:bg-primary/20 disabled:active:border-none',
      };
      break;
    case 'ghost-no-padding':
      variant = {
        primary:
          'text-primary disabled:hover:bg-background disabled:text-grey-7 hover:text-teal-5 focus:text-teal-7',
        secondary:
          'text-grey-12 disabled:hover:bg-background disabled:text-grey-7 hover:text-primary focus:text-grey-10',
        tertiary:
          'text-primary disabled:hover:bg-background disabled:text-grey-7 hover:text-teal-5 focus:text-teal-7',
      };
      break;
    case 'danger':
      variant = {
        primary:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover disabled:bg-muted disabled:text-grey-7 hover:border-destructive focus:border-red-3 active:border-red-3 disabled:active:border-none',
        secondary:
          'border border-destructive text-destructive hover:bg-destructive-light disabled:border-muted disabled:hover:bg-background disabled:text-grey-7 hover:border-destructive focus:border-red-3 active:border-red-3 disabled:active:border-none',
        tertiary:
          'text-destructive hover:bg-destructive-light disabled:hover:bg-background disabled:text-grey-7 hover:border-destructive focus:border-red-3 active:border-red-3 disabled:active:border-none',
      };
      break;
    case 'split':
      variant = {
        primary:
          'bg-primary text-primary-foreground disabled:text-grey-7 hover:bg-primary-hover disabled:bg-muted disabled:active:border-none',
        secondary:
          'bg-primary text-primary-foreground disabled:text-grey-7 hover:bg-primary-hover disabled:bg-muted disabled:active:border-none',
        tertiary:
          'bg-primary text-primary-foreground disabled:text-grey-7 hover:bg-primary-hover disabled:bg-muted disabled:active:border-none',
      };
      break;
    default:
      variant;
      break;
  }
  return cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-background disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-50',
    {
      variants: {
        variant,
        size: {
          default: 'h-10 rounded-md px-4',
          icon: 'h-10 w-10',
          'icon-circle': 'h-10 w-10 rounded-full',
          large: 'h-12 rounded-md px-5',
          extraLarge: 'h-14 rounded-md px-6',
          small: 'h-8 rounded-md px-3',
        },
      },
      defaultVariants: {
        variant: 'primary',
        size: 'default',
      },
    },
  );
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isLoading?: boolean;
  variant?: TVariant;
  size?: TSize;
  typeButton?: TTypeButton;
  iconPlus?: 'left' | 'right' | boolean;
  classNameContent?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading,
      typeButton = 'main',
      iconPlus = false,
      classNameContent,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants(typeButton)({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
