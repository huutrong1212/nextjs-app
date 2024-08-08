import ContactSalesForm from '@/app/contact-sales/_components/contact-sales-form';
import Link from 'next/link';
import { Routes } from '@/types/routes';
import { Typography } from '@/components';
import { getCategoryList } from '@/services/category';
import { metadataConfig } from '@/config/metadata';

export const metadata = metadataConfig.contactSales;
const ContactSales = async () => {
  const dataCategories = await getCategoryList({
    exclude_children: true,
    include_default: false,
  });

  const { categories = [] } = dataCategories ?? {};

  return (
    <section className="container py-12 lg:py-14 bg-white border-b">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <Typography variant="h1">How can we help you today?</Typography>
          <Typography variant="h4" className="font-normal">
            Whether you need assistance with a specific product or have a more general question,
            We&apos;re here to help.
          </Typography>
        </div>
        <div className="w-full md:w-1/2">
          <ContactSalesForm categoriesData={categories} />
          <p className="text-xs mt-5">
            By clicking “Submit” you agree to our{' '}
            <Link href={Routes.privacyPolicy} legacyBehavior>
              <a className="underline">Privacy Policy.</a>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSales;
