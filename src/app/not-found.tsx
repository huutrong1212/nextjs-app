import Link from 'next/link';
import { Button, Typography } from '@/components';
import { EmptyIcon } from '@/public/icons';

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-background flex flex-col justify-center items-center gap-4">
      <EmptyIcon />
      <Typography variant="h3">Not Found</Typography>
      <Typography>We can&apos;t seem to find a page you&apos;re looking for.</Typography>
      <Button asChild>
        <Link href="/">Go to home</Link>
      </Button>
    </div>
  );
}
