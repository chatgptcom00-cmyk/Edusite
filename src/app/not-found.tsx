import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center gap-4 text-center">
      <TriangleAlert className="h-16 w-16 text-primary" />
      <h2 className="font-headline text-3xl font-bold">Page Not Found</h2>
      <p className="text-muted-foreground">
        Could not find the page you were looking for.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
