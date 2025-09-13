import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="rounded-md bg-primary p-2 text-primary-foreground">
        <BookOpen className="h-5 w-5" />
      </div>
      <span className="hidden font-headline text-lg font-bold sm:inline-block">
        CourseForge
      </span>
    </Link>
  );
}
