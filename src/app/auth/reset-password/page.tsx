export const dynamicParams = true;

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with no SSR to avoid issues with useSearchParams
const ResetPasswordClient = dynamic(
  () => import('./client'),
  { ssr: false }
);

export default function ResetPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below
          </p>
        </div>
        
        <Suspense fallback={<div className="p-4 text-center">Loading reset password form...</div>}>
          <ResetPasswordClient />
        </Suspense>
      </div>
    </div>
  );
}
