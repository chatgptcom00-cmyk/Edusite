import { Course } from '@/lib/courses';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { Star, UserCircle } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
        <CardHeader className="p-0">
          <div className="aspect-video overflow-hidden">
            <Image
              src={course.imageUrl}
              alt={course.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={course.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              <span>{course.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
              <span className="font-medium text-foreground">{course.rating.toFixed(1)}</span>
            </div>
          </div>
          <CardTitle className="mt-4 font-headline text-xl leading-tight">
            {course.title}
          </CardTitle>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
