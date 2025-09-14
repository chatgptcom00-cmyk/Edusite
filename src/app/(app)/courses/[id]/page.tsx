
'use client';

import RecommendedCourses from '@/components/recommended-courses';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Course, courses, getCourseById } from '@/lib/courses';
import { Clock, PlayCircle, Star, UserCircle, FileText, Briefcase, Puzzle, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';

// This is a client component to handle state for course completion
function CourseContent({ course, allCourses }: { course: Course; allCourses: Course[] }) {
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const toggleModuleCompletion = (moduleId: string) => {
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const tabbedContent = [
    {
      value: 'videos',
      label: 'Videos',
      icon: PlayCircle,
      enabled: course.features.videos,
      content: (
        <Accordion type="single" collapsible className="w-full mt-4">
          {course.modules.map((module, index) => {
            const moduleId = `${course.id}-${index}`;
            const isCompleted = completedModules.has(moduleId);
            return (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-medium hover:no-underline">
                  <div className="flex items-center gap-3">
                    <button onClick={(e) => {
                        e.stopPropagation(); // Prevent accordion from opening/closing
                        toggleModuleCompletion(moduleId);
                      }}
                      className="focus:outline-none"
                      aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                    >
                      <CheckCircle2 className={`h-6 w-6 transition-colors ${isCompleted ? 'text-blue-500 fill-current' : 'text-muted-foreground'}`} />
                    </button>
                    <span>{module.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex items-center justify-between pl-14">
                  <p className="text-sm text-muted-foreground">
                    {module.type === 'video' ? 'Video' : 'Article'}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{module.duration}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      )
    },
    {
      value: 'documents',
      label: 'Documents',
      icon: FileText,
      enabled: course.features.documents,
      content: <div className="p-6 text-center text-muted-foreground">No documents available for this course yet.</div>
    },
    {
      value: 'practical',
      label: 'Practical',
      icon: Briefcase,
      enabled: course.features.practical,
      content: <div className="p-6 text-center text-muted-foreground">No practical exercises available for this course yet.</div>
    },
    {
      value: 'quiz',
      label: 'Quiz',
      icon: Puzzle,
      enabled: course.features.quiz,
      content: <div className="p-6 text-center text-muted-foreground">No quiz available for this course yet.</div>
    }
  ].filter(tab => tab.enabled);

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
            
            <div className="mt-8 rounded-lg border bg-card shadow-sm">
                <Tabs defaultValue={tabbedContent[0]?.value} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 m-2">
                    {tabbedContent.map(tab => (
                       <TabsTrigger key={tab.value} value={tab.value}>
                        <tab.icon className="mr-2 h-5 w-5" />
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {tabbedContent.map(tab => (
                    <TabsContent key={tab.value} value={tab.value}>
                      {tab.content}
                    </TabsContent>
                  ))}
                </Tabs>
            </div>

          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border bg-card p-6 shadow-sm">
                 <h2 className="font-headline text-2xl font-semibold mb-4">
                  About this course
                </h2>
                <p className="text-foreground/70">{course.longDescription}</p>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{course.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                    <span className="font-bold">{course.rating.toFixed(1)}</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background py-12 md:py-24">
        <RecommendedCourses courseId={course.id} allCourses={allCourses} />
      </div>
    </div>
  );
}


export default function CoursePageWrapper({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | undefined>(undefined);

  useEffect(() => {
    const foundCourse = getCourseById(params.id);
    setCourse(foundCourse);
  }, [params.id]);

  if (course === undefined) {
    // Still loading or course not found.
    // notFound() can't be used in client component directly in this way,
    // so we can show a loading state or handle not found case.
    // For now, returning null or a loading indicator.
    return null; 
  }

  // Handle case where course is null (not found after check)
  if (course === null) {
    notFound();
    return null;
  }

  return <CourseContent course={course} allCourses={courses} />;
}
