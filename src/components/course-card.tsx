import { Course } from '@/lib/courses';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, UserCircle } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const Icon = course.icon;
  return (
    <Link href={`/courses/${course.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
        <CardHeader className="p-0">
          <div
            className="aspect-video flex items-center justify-center bg-muted transition-colors duration-300 ease-in-out group-hover:bg-secondary"
            style={{ backgroundColor: `${course.iconColor}20` }}
          >
            <Icon
              className="h-20 w-20 text-white transition-transform duration-300 ease-in-out group-hover:scale-110"
              style={{ color: course.iconColor }}
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
