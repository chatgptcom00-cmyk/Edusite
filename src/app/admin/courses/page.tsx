
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { courses, iconMap } from '@/lib/courses';
import { Button } from '@/components/ui/button';
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
import { Edit } from 'lucide-react';
import Link from 'next/link';

export default function AdminCoursesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('admin-auth');
    if (session !== 'true') {
      router.push('/wp-admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Manage Courses
          </CardTitle>
          <CardDescription>
            Review and edit existing course details and logos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map(course => {
                const Icon = iconMap[course.icon];
                return (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-16 w-16 items-center justify-center rounded-lg"
                          style={{ backgroundColor: course.iconColor }}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{course.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {course.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/courses/edit/${course.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
