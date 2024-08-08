'use client';

import { Button } from '@/components';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-3xl font-semibold text-red-6 mb-4">Something went wrong!</h2>
          <Button onClick={() => reset()} typeButton="danger">
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
