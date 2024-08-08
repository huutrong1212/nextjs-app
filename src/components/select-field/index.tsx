'use client';

import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import SelectCustom, { Option } from '@/components/ui/select/select-custom';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';

type SelectFieldProps<T = unknown> = {
  control: any;
  name: string;
  label: string;
  options: Option<T>[];
  placeholder?: string;
  handleChange?: (value: string, option?: Option) => void;
  contentCn?: string;
  triggerCn?: string;
  required?: boolean;
};

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  placeholder,
  handleChange,
  contentCn,
  triggerCn,
  control,
  required,
}) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel className="font-semibold">
            {label} {required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <FormControl>
            <SelectCustom
              value={field.value}
              options={options}
              onChange={(value, option) => {
                field.onChange(value);
                handleChange && handleChange(value, option);
              }}
              placeholder={placeholder}
              contentCn={contentCn}
              triggerCn={cn(error ? 'border-red-5' : '', triggerCn)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
