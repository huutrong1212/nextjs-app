'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ControllerRenderProps, UseFormReturn, useFormContext } from 'react-hook-form';
import { SelectPro, TSelectProOption } from '../select-pro';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input, InputProps } from '../ui';
import { FIELD_KEY } from '@/types/common';
import { cn } from '@/lib/utils';
import { getCountriesList } from '@/services/category';

export type TPhoneValue = {
  phone?: string;
  phone_code: string;
};

interface PhoneNumberFieldProps extends InputProps {
  name: string;
  label?: string;
  formControl: UseFormReturn<any>;
  required?: boolean;
  classNameWrap?: string;
  direction?: 'vertical' | 'horizontal';
  helpText?: string;
  isShowHelpText?: boolean;
  phoneValue?: TPhoneValue;
  hideMessage?: boolean;
  triggerOnChange?: boolean;
}

function removeLeadingZeros(inputString: string) {
  return inputString.replace(/^0+/, '');
}

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
  label = 'Phone Number',
  formControl,
  required,
  classNameWrap,
  direction = 'vertical',
  helpText,
  isShowHelpText,
  hideMessage,
  triggerOnChange,
  ...props
}) => {
  const refInput = React.useRef<HTMLInputElement>(null);
  const { trigger } = useFormContext();

  const handleBlurPhoneNumber =
    (field: ControllerRenderProps<any, FIELD_KEY.phone>) => (e: ChangeEvent<HTMLInputElement>) => {
      const v = removeLeadingZeros(e.target.value);
      field.onChange(v);
      trigger(FIELD_KEY.phone);
    };
  const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 12)
      formControl.setValue(FIELD_KEY.phone as unknown as string, e.target.value);
    triggerOnChange && trigger(FIELD_KEY.phone);
  };

  return (
    <Container className={cn(direction === 'horizontal' && 'flex gap-4', classNameWrap)}>
      {label && (
        <FormLabel
          className={cn(direction === 'horizontal' && 'inline-flex items-center', 'font-semibold')}
          style={{
            ...(direction === 'horizontal'
              ? { height: (refInput.current && refInput.current.clientHeight) || 40 + 'px' }
              : {}),
          }}
        >
          {label}
          {required && <span className="text-destructive">*</span>}
        </FormLabel>
      )}
      <span
        className={cn(
          'flex relative bg-background rounded-md max-w-full w-full border border-input',
          formControl.getFieldState(FIELD_KEY.phone).invalid && 'border-red-5',
        )}
      >
        <FormField
          control={formControl.control}
          name={FIELD_KEY.phone_code}
          render={({ field }) => (
            <SelectCountryCode
              onChange={(opt: TSelectProOption) => field.onChange(opt.value)}
              value={field.value}
              disabled={props.disabled}
            />
          )}
        />
        <FormField
          name={FIELD_KEY.phone}
          control={formControl.control}
          render={({ field }) => (
            <div className="flex flex-1 ml-[4px]">
              <FormControl className="focus-visible:clear-none">
                <Input
                  {...field}
                  onBlur={handleBlurPhoneNumber(field)}
                  onChange={handleChangePhoneNumber}
                  ref={refInput}
                  type="number"
                  onKeyDown={(evt) => {
                    if (['e', 'E', '+', '-', '.'].includes(evt.key)) {
                      return evt.preventDefault();
                    }
                    if (
                      evt.keyCode == 101 ||
                      evt.keyCode == 69 ||
                      evt.keyCode == 45 ||
                      evt.keyCode == 43 ||
                      evt.keyCode == 190
                    ) {
                      return evt.preventDefault();
                    }
                  }}
                  {...props}
                />
              </FormControl>
              {isShowHelpText && <h3 className="text-[#707171] text-xs font-normal">{helpText}</h3>}
            </div>
          )}
        />
      </span>
      <FormField
        name={FIELD_KEY.phone}
        control={formControl.control}
        render={() => <>{!hideMessage && <FormMessage />}</>}
      />
    </Container>
  );
};

const Container = styled(FormItem)`
  input[name='phone'],
  .phone-code__select-container .select__selected-container {
    min-height: 38px !important;
    height: 100%;
    border: none;
  }
  .phone-code__select-container {
    margin-right: 0.25rem;
    .selected__value {
      min-width: fit-content;
      .country {
        display: none;
      }
    }
    .value__container {
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      width: 52px;
      justify-content: center;
    }
  }
  .dropdown__indicator {
    padding: 0;
  }
  .menu__container {
    width: fit-content;
  }

  .input-container {
    position: relative;
  }
  .input-container::before {
    left: -4px;
    z-index: 10;
    position: absolute;
    content: '|';
    color: #dedede;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default PhoneNumberField;

const SelectCountryCode = ({ value, onChange, disabled }: any) => {
  const [options, setOptions] = useState<TSelectProOption[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountriesList();
        const countryOptions = response.data.map((country) => ({
          value: '+' + country.phone_code.toString(),
          label: (
            <>
              +{country.phone_code} <span className="country">{`(${country.name})`}</span>
            </>
          ),
        }));
        setOptions(countryOptions);
      } catch (error) {
        console.error('Error fetching country codes:', error);
      }
    };

    fetchCountries();
  }, []);

  const valueOpt = options?.find((i) => i.value == value);

  return (
    <SelectPro
      disabled={disabled}
      options={(options as unknown as TSelectProOption[]) ?? []}
      value={valueOpt}
      onChange={onChange}
      classNameContainer={'phone-code__select-container'}
      placeholder="Code"
    />
  );
};
