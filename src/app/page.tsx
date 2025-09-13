import CourseCard from '@/components/course-card';
import { Button } from '@/components/ui/button';
import { courses } from '@/lib/courses';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="bg-card/50 py-20 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <BadgeCheck className="mr-2 h-5 w-5" />
            <span>All Courses are 100% Free!</span>
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl">
            Unlock Your Potential with EduSite
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground/80">
            Explore cutting-edge courses in technology, design, and business.
            Start your learning journey today and forge the skills for tomorrow.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="font-bold">
              <Link href="/courses">
                Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="courses" className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Featured Courses
            </h2>
            <p className="mt-2 text-lg leading-8 text-foreground/70">
              Hand-picked courses to elevate your career.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 xl:grid-cols-3">
            {courses.slice(0, 3).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
