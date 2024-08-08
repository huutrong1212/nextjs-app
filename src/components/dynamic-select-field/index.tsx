'use client';

import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  SelectPro,
  TSelectProOption,
} from '@/components';
import { useFormContext, useController } from 'react-hook-form';
import { getValueSelect } from '@/utils/helpers/common';

interface DynamicSelectProps {
  fieldName: string;
  label?: string;
  placeholder?: string;
  options?: TSelectProOption[];
  required?: boolean;
  disabled?: boolean;
  isMultiple?: boolean;
  isReadOnly?: boolean;
  isLoadData?: boolean;
  isClearable?: boolean;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({
  label,
  fieldName,
  placeholder = 'Select option',
  options,
  required,
  disabled,
  isMultiple,
  isReadOnly,
  isLoadData,
  isClearable,
}) => {
  const { control, setValue } = useFormContext();
  const { field, formState } = useController({
    name: fieldName,
    control: control,
    rules: { required },
  });
  const { errors, touchedFields } = formState;
  const hasError = !!errors[fieldName] && touchedFields?.[fieldName];

  const handleSelectChange = (selectedOptions: TSelectProOption | TSelectProOption[] | null) => {
    if (selectedOptions === null) {
      const newValue = isMultiple ? [] : '';
      setValue(fieldName, newValue);
      field.onChange(newValue);
      return;
    }

    const selectedValues = Array.isArray(selectedOptions)
      ? selectedOptions.map((option) => option.value)
      : [selectedOptions.value];

    setValue(fieldName, selectedValues);
    field.onChange(isMultiple ? selectedValues : selectedValues[0]);
  };

  return (
    <FormField
      control={control}
      name={fieldName}
      render={() => (
        <FormItem>
          {label && (
            <FormLabel className="font-bold">
              {label} {required && <span className="text-red-600">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <SelectPro
              {...field}
              value={getValueSelect(options, field.value, isMultiple) || null}
              onChange={(option: TSelectProOption) => {
                handleSelectChange(option);
              }}
              options={options}
              placeholder={placeholder}
              isMulti={isMultiple}
              disabled={disabled}
              isReadOnly={isReadOnly}
              error={hasError}
              loading={isLoadData}
              isClearable={isClearable}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DynamicSelect;
