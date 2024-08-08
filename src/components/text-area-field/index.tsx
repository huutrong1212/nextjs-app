'use client';

import { useEffect, useRef } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea } from '../ui';
import { cn } from '@/lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  control: any;
  fieldName: string;
  label?: string;
  placeholder?: string;
  debounceTime?: number;
  required?: boolean;
}

const TextAreaField: React.FC<TextAreaProps> = ({
  control,
  fieldName,
  label = 'Text Area',
  placeholder = 'Input',
  debounceTime,
  required,
  ...props
}) => {
  const typingTimeoutRef = useRef<number | NodeJS.Timeout | null>(null);

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>, callback: any) => {
    const value = event.target.value;

    if (callback) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current as NodeJS.Timeout);
      }
      typingTimeoutRef.current = setTimeout(() => {
        callback(value);
      }, debounceTime || 0);
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current as NodeJS.Timeout);
      }
    };
  }, []);

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="font-semibold">
              {label} <span className="text-red-600">{required ? '*' : ''}</span>
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                {...props}
                className={cn('min-h-[100px]', props.disabled && 'bg-accent text-muted-foreground')}
                placeholder={placeholder}
                onChange={(event) => {
                  handleTextAreaChange(event, props.onChange);
                  field.onChange(event.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default TextAreaField;
