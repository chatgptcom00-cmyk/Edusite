import CourseCard from '@/components/course-card';
import { courses } from '@/lib/courses';

export default function CoursesPage() {
  return (
    <div className="flex flex-col bg-slate-50">
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
