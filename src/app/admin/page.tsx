
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, Trash2, Video, FileText, Briefcase, Puzzle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('admin-auth');
    if (session !== 'true') {
      router.push('/admin/login');
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
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">
                Upload New Course
              </CardTitle>
              <CardDescription>
                Fill in the details below to add a new course to the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Introduction to Next.js 14"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Course Description</Label>
                  <Textarea
                    id="description"
                    placeholder="A short summary of the course content."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content-url">Content URL</Label>
                  <Input
                    id="content-url"
                    type="url"
                    placeholder="https://example.com/course-video"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="media">Course Media</Label>
                  <div className="flex w-full items-center justify-center">
                    <label
                      htmlFor="media"
                      className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted hover:bg-secondary"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="mb-4 h-8 w-8 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Video, Image, or Document file
                        </p>
                      </div>
                      <Input id="media" type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                <Button type="submit" className="w-full font-semibold" size="lg">
                  Upload Course
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">
                Manage Courses
              </CardTitle>
              <CardDescription>
                Review, edit, and delete existing courses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>
                      <div className="flex items-center justify-center gap-2">
                        <Video className="h-5 w-5" />
                        <span className="sr-only">Videos</span>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span className="sr-only">Documents</span>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center justify-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        <span className="sr-only">Practical</span>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center justify-center gap-2">
                        <Puzzle className="h-5 w-5" />
                        <span className="sr-only">Quiz</span>
                      </div>
                    </TableHead>
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
                            <div className="relative h-16 w-16 flex-shrink-0">
                              <div className="flex h-16 w-16 items-center justify-center rounded-lg" style={{ backgroundColor: course.iconColor }}>
                                <Icon className="h-8 w-8 text-white" />
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold">{course.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {course.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox defaultChecked={course.features.videos} />
                        </TableCell>
                         <TableCell className="text-center">
                          <Checkbox defaultChecked={course.features.documents} />
                        </TableCell>
                         <TableCell className="text-center">
                          <Checkbox defaultChecked={course.features.practical} />
                        </TableCell>
                         <TableCell className="text-center">
                          <Checkbox defaultChecked={course.features.quiz} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-5 w-5 text-destructive" />
                            <span className="sr-only">Delete course</span>
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
      </div>
    </div>
  );
}
