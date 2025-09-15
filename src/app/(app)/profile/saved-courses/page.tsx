
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { courses, iconMap } from '@/lib/courses';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function SavedCoursesPage() {
  // In a real app, this would come from user data.
  // For this demo, we'll show a few pre-selected "saved" courses.
  const savedCourses = courses.slice(1, 4);

  return (
    <div className="container mx-auto min-h-[calc(100vh-10rem)] max-w-4xl px-4 py-12 md:py-16">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Your Saved Courses</CardTitle>
          <CardDescription>
            Review and manage the courses you've saved for later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedCourses.length > 0 ? (
                savedCourses.map(course => {
                  const Icon = iconMap[course.icon];
                  return (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-4">
                           <Link href={`/courses/${course.id}`}>
                            <div
                              className="flex h-16 w-16 items-center justify-center rounded-lg"
                              style={{ backgroundColor: course.iconColor }}
                            >
                              <Icon className="h-8 w-8 text-white" />
                            </div>
                          </Link>
                          <div>
                            <Link href={`/courses/${course.id}`} className="font-semibold hover:underline">
                              {course.title}
                            </Link>
                            <p className="text-sm text-muted-foreground">
                              {course.author}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    You haven't saved any courses yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
