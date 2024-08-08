'use client';

import {
  ScrollArea,
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/components';
import { cn } from '@/lib/utils';
import { SelectProps } from '@radix-ui/react-select';
import React, { ReactElement } from 'react';

export type Option<T = unknown> = {
  value: string;
  label: ReactElement | string;
} & T;

export type PropsSelectCustom<T = unknown> = SelectProps & {
  value?: Option<T>['value'];
  options?: Option<T>[];
  placeholder?: string;
  selectLabel?: string;
  onChange?: (v: Option<T>['value'], option?: Option<T>) => void;
  contentCn?: string;
  triggerCn?: string;
};

function SelectCustom<T>(props: PropsSelectCustom<T>, ref: React.ForwardedRef<HTMLInputElement>) {
  function handleChangeValue(v: string) {
    const foundOpt = props.options?.find((o) => o.value == v);
    props.onChange && props.onChange(v as Option<T>['value'], foundOpt);
  }

  const selectRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => selectRef.current as HTMLInputElement);

  return (
    <Select onValueChange={handleChangeValue} value={props?.value} {...props}>
      <SelectTrigger className={cn('w-full', props.triggerCn ?? '')}>
        <SelectValue placeholder={props.placeholder ?? 'Select an option'} />
      </SelectTrigger>
      <ScrollArea>
        <SelectContent className={cn('select-content', props.contentCn)}>
          <SelectGroup>
            {props?.selectLabel && <SelectLabel>{props?.selectLabel}</SelectLabel>}
            {(props.options ?? []).map((optionsI) => (
              <SelectItem key={'select-option-' + optionsI.value} value={optionsI.value}>
                {optionsI.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </ScrollArea>
    </Select>
  );
}

export default React.forwardRef(SelectCustom);
