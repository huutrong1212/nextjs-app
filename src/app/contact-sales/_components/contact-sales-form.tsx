'use client';

import { ApiResponse, CodeType, ESubmissionType } from '@/types/common';
import { Button, Form, TextAreaField, TextField } from '@/components';
import React, { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { baseAuthQuery, basePublicUrl } from '@/services/base-query';

import DynamicSelect from '@/components/dynamic-select-field';
import { ICategory } from '@/types/category';
import PhoneNumberField from '@/components/phone-field';
import { useToast } from '@/hooks/useToast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  company_name: z.string().min(1, 'Company name is required'),
  topic_id: z.string().min(1, 'Topic is required'),
  message: z.string().min(1, 'Content is required'),
  phone_code: z.string(),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === undefined || val === null || val === '') {
          return true;
        }
        return val.length >= 6 && val.length <= 12;
      },
      { message: 'Phone number must be between 6 and 12 characters long.' },
    ),
});

type TContactForm = z.infer<typeof schema>;
const ContactSalesForm = ({ categoriesData }: { categoriesData: ICategory[] }) => {
  const { toast } = useToast();

  const topicOptions = useMemo(() => {
    return categoriesData.map((category) => ({
      label: category.name,
      value: category.id,
    }));
  }, [categoriesData]);

  const defaultValues = {
    email: '',
    first_name: '',
    last_name: '',
    company_name: '',
    topic_id: '',
    message: '',
    phone: '',
    phone_code: '+1',
  };

  const form = useForm<TContactForm>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onSubmit',
  });

  const { handleSubmit } = form;
  const onSubmit: SubmitHandler<any> = async (data) => {
    const { phone_code, ...restData } = data;
    const payload = {
      ...restData,
      category: ESubmissionType.CONTACT_US,
    };
    try {
      const response = await fetch(`${basePublicUrl}/portal/submission`, {
        ...baseAuthQuery(),
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData: ApiResponse = await response.json();
      if (responseData.code === CodeType.CODE_SUCCESS) {
        toast({
          showIcon: true,
          variant: 'successLight',
          title: 'Success',
          description: 'Your request has been submitted successfully',
        });
        form.reset(defaultValues);
      } else {
        toast({
          showIcon: true,
          variant: 'destructive',
          title: 'Error',
          description: responseData.message,
        });
      }
    } catch (error) {
      toast({
        showIcon: true,
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to submit your request',
      });
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Work Email Address"
          name="email"
          formControl={form}
          placeholder="example@example.com"
          required
        />
        <TextField
          label="First Name"
          name="first_name"
          formControl={form}
          placeholder="Enter your first name"
          required
        />
        <TextField
          label="Last Name"
          name="last_name"
          formControl={form}
          placeholder="Enter your last name"
          required
        />
        <TextField
          label="Company Name"
          name="company_name"
          formControl={form}
          placeholder="Enter your company name"
          required
        />
        <DynamicSelect
          fieldName="topic_id"
          options={topicOptions}
          label="Which topic best fits your needs?"
          placeholder="Select a topic"
          required
        />
        <PhoneNumberField
          className="h-10 rounded-lg"
          classNameWrap="flex flex-col justify-between"
          label="Phone number"
          name="phone"
          formControl={form}
          placeholder="Enter your phone number"
          phoneValue={{
            phone_code: form.getValues('phone_code'),
            phone: form.getValues('phone'),
          }}
        />
        <TextAreaField
          control={form.control}
          fieldName="message"
          placeholder="Your content here"
          label="How can we help you?"
          required
        />
        <Button type="submit" className="w-1/4">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ContactSalesForm;
