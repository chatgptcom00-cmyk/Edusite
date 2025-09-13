import CourseCard from '@/components/course-card';
import { courses } from '@/lib/courses';

export default function CoursesPage() {
  return (
    <div className="flex flex-col">
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Courses
            </h1>
            <p className="mt-2 text-lg leading-8 text-foreground/70">
              Hand-picked courses to elevate your career.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 xl:grid-cols-3">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
