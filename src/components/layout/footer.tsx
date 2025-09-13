import Link from 'next/link';
import Logo from './logo';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CourseForge, Inc.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
