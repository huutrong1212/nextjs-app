'use client';

import { ApiResponse, CodeType, ESubmissionType } from '@/types/common';
import { Button, Form, TextField } from '@/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { baseAuthQuery, basePublicUrl } from '@/services/base-query';

import Link from 'next/link';
import { Routes } from '@/types/routes';
import { useToast } from '@/hooks/useToast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  company_name: z.string().optional(),
});

type TDownloadForm = z.infer<typeof schema>;
interface IProps {
  pdf?: string;
}

const DownloadForm: React.FC<IProps> = ({ pdf }) => {
  const form = useForm<TDownloadForm>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      company_name: '',
    },
  });

  const { toast } = useToast();
  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<TDownloadForm> = async (data) => {
    const payload = {
      ...data,
      category: ESubmissionType.DOWNLOAD_MATERIALS,
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
        if (pdf) {
          const fileResponse = await fetch(
            `${basePublicUrl}/file/objects?path=${encodeURIComponent(pdf)}`,
            {
              ...baseAuthQuery(),
            },
          );

          if (fileResponse.ok) {
            const fileData = await fileResponse.json();
            const downloadUrl = fileData.data[0].url;
            window.open(downloadUrl, '_blank');
          } else {
            throw new Error('Failed to fetch download link');
          }
        }

        toast({
          showIcon: true,
          variant: 'successLight',
          title: 'Success',
          description: 'Your request has been submitted successfully',
        });
        form.reset();
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
          label="Work email address"
          name="email"
          formControl={form}
          placeholder="example@example.com"
          required
        />
        <TextField
          label="First name"
          name="first_name"
          formControl={form}
          placeholder="Enter your first name"
        />
        <TextField
          label="Last name"
          name="last_name"
          formControl={form}
          placeholder="Enter your last name"
        />
        <TextField
          label="Company name"
          name="company_name"
          formControl={form}
          placeholder="Enter your company name"
        />

        <Button type="submit" className="w-1/4">
          Download
        </Button>

        <p className="text-xs">
          By clicking “Download” you agree to our{' '}
          <Link href={Routes.privacyPolicy} legacyBehavior>
            <a className="underline">Privacy Policy.</a>
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default DownloadForm;
