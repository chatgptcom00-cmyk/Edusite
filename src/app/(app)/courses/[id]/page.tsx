
import RecommendedCourses from '@/components/recommended-courses';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Course, courses, getCourseById } from '@/lib/courses';
import { Clock, PlayCircle, Star, UserCircle, FileText, Briefcase, Puzzle, CheckCircle2, Download } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// This is a server component now.
async function CourseContent({ course, allCourses }: { course: Course; allCourses: Course[] }) {
  
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
            return (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-medium hover:no-underline">
                  <div className="flex items-center gap-3">
                     <CheckCircle2 className={`h-6 w-6 transition-colors text-muted-foreground`} />
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
                  <TabsList className={`grid w-full grid-cols-${tabbedContent.length} m-2`}>
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

                {course.isDownloadable && (
                  <Button className="mt-6 w-full font-semibold" size="lg">
                    <Download className="mr-2 h-5 w-5" />
                    Download Course Materials
                  </Button>
                )}
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


export default async function CoursePageWrapper({ params }: { params: { id: string } }) {
  const course = getCourseById(params.id);

  if (!course) {
    notFound();
  }

  return <CourseContent course={course} allCourses={courses} />;
}
