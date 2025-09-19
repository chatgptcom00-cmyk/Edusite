
'use client';

import { useState } from 'react';
import CourseCard from '@/components/course-card';
import { courses } from '@/lib/courses';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-background">
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Explore Our Courses
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Find the perfect course to advance your skills and knowledge.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="relative mx-auto w-full max-w-xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search for courses..."
                className="w-full rounded-full bg-muted py-6 pl-12 pr-6 text-lg"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
                <div className="col-span-full text-center text-muted-foreground py-16">
                  <h3 className="text-2xl font-semibold">No Courses Found</h3>
                  <p className="mt-2">Try adjusting your search.</p>
                </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
