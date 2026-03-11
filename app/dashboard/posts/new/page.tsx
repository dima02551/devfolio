'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/dashboard/posts/new');
  }, [router]);

  return null;
}
