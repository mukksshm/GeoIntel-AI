'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AIAssistantRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/ai-search');
  }, [router]);

  return null;
}
