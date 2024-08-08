'use client';

import { cn } from '@/lib/utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Minus, Plus } from 'lucide-react';
import React from 'react';

const AccordionSystem = AccordionPrimitive.Root;

const AccordionItemSystem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
AccordionItemSystem.displayName = 'AccordionItemSystem';

type AccordionTriggerProps = {
  arrowPosition?: 'left' | 'right';
  showArrow?: boolean;
};

const AccordionTriggerSystem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & AccordionTriggerProps
>(({ className, children, arrowPosition = 'right', showArrow = true, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex bg-white">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        '[&[data-state=open]>span.icon-plus]:hidden [&[data-state=closed]>span.icon-minus]:hidden flex flex-1 items-center justify-between h-[88px] font-semibold pl-6 pr-6 transition-all hover:bg-grey-5 border-t',
        className,
      )}
      {...props}
    >
      {arrowPosition === 'left' && showArrow && (
        <>
          <span className="w-10 h-10 flex items-center justify-center icon-minus">
            <Minus
              size={20}
              strokeWidth={3}
              className="shrink-0 transition-transform duration-200"
            />
          </span>
          <span className="w-10 h-10 flex items-center justify-center icon-plus">
            <Plus
              size={20}
              strokeWidth={3}
              className="shrink-0 transition-transform duration-200"
            />
          </span>
        </>
      )}
      {children}
      {arrowPosition === 'right' && showArrow && (
        <>
          <span className="shrink-0 w-10 h-10 flex items-center justify-center icon-minus">
            <Minus
              size={20}
              strokeWidth={3}
              className="shrink-0 transition-transform duration-200"
            />
          </span>
          <span className="shrink-0 w-10 h-10 flex items-center justify-center icon-plus">
            <Plus
              size={20}
              strokeWidth={3}
              className="shrink-0 transition-transform duration-200"
            />
          </span>
        </>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTriggerSystem.displayName = 'AccordionTriggerSystem';

const AccordionContentSystem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pt-0 flex justify-center', className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContentSystem.displayName = 'AccordionContentSystem';

const AccordionHeaderSystem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Header {...props} ref={ref}>
    {children}
  </AccordionPrimitive.Header>
));
AccordionHeaderSystem.displayName = 'AccordionHeaderSystem';

export {
  AccordionSystem,
  AccordionTriggerSystem,
  AccordionHeaderSystem,
  AccordionItemSystem,
  AccordionContentSystem,
};
