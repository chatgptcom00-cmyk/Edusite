import RecommendedCourses from '@/components/recommended-courses';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { courses, getCourseById } from '@/lib/courses';
import { Clock, PlayCircle, Star, UserCircle } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = getCourseById(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="bg-card/50">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">{course.author}</Badge>
              <h1 className="font-headline text-4xl font-bold tracking-tight text-primary lg:text-5xl">
                {course.title}
              </h1>
              <p className="mt-4 text-lg text-foreground/80">
                {course.description}
              </p>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted shadow-lg">
              <Image
                src={course.imageUrl}
                alt={course.title}
                width={1280}
                height={720}
                className="h-full w-full object-cover"
                data-ai-hint={course.imageHint}
              />
            </div>
            <div className="mt-8">
              <h2 className="font-headline text-2xl font-semibold">
                About this course
              </h2>
              <p className="mt-4 text-foreground/70">{course.longDescription}</p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{course.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                  <span className="font-bold">{course.rating.toFixed(1)}</span>
                </div>
              </div>
              <h3 className="font-headline text-xl font-semibold">
                Course Content
              </h3>
              <Accordion type="single" collapsible className="w-full mt-4">
                {course.modules.map((module, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="font-medium hover:no-underline">
                      <div className='flex items-center gap-3'>
                        <PlayCircle className="h-5 w-5 text-primary" />
                        <span>{module.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex items-center justify-between pl-10">
                      <p className="text-sm text-muted-foreground">
                        {module.type === 'video' ? 'Video' : 'Article'}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{module.duration}</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background py-12 md:py-24">
        <RecommendedCourses courseId={course.id} allCourses={courses} />
      </div>
    </div>
  );
}
