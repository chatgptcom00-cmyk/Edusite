
import { Course, iconMap } from '@/lib/courses';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const Icon = iconMap[course.icon];
  return (
    <Link href={`/courses/${course.id}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 bg-card rounded-2xl shadow-lg">
        <CardHeader className="pt-8 pb-4">
          <div className='flex justify-center items-center'>
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full transition-colors duration-300 ease-in-out"
              style={{ backgroundColor: course.iconColor }}
            >
              <Icon
                className="h-10 w-10 text-white transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-center flex-1">
           <CardTitle className="mt-2 font-headline text-2xl font-semibold leading-tight">
            {course.title}
          </CardTitle>
          <p className="mt-3 text-base text-muted-foreground">
            {course.description}
          </p>
        </CardContent>
        <CardFooter className='flex-col pb-8 pt-4'>
          <Button 
            className="font-semibold text-lg py-6 px-8 rounded-full" 
            style={{
              background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary) / 0.8))',
              color: 'hsl(var(--primary-foreground))'
            }}
          >
            View Courses
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
