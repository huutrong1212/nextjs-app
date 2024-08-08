import React from 'react';
import { TSelectProOption } from '@/components/select-pro';

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function convertTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
  return date.toLocaleDateString('en-US', options);
}

export function getTextFromJSX(element: React.ReactNode | null | undefined): string {
  if (!element) {
    return '';
  }

  if (typeof element === 'string' || typeof element === 'number') {
    return element.toString();
  }

  if (Array.isArray(element)) {
    return element.map(getTextFromJSX).join('');
  }

  if (React.isValidElement(element)) {
    return getTextFromJSX(element.props.children);
  }

  return '';
}

export function getValueSelect(
  opts: TSelectProOption[] = [],
  value?: string | string[],
  isMulti?: boolean,
): TSelectProOption | TSelectProOption[] | undefined {
  if (isMulti && Array.isArray(value)) {
    return opts.filter((option) => value.includes(option.value));
  } else {
    return opts.find((option) => option.value === value);
  }
}
