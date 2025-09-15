
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
import { UploadCloud, TrendingUp } from 'lucide-react';
import {
  BookOpen,
} from 'lucide-react';

export default function AdminPage() {
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
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">
              All available courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most Viewed Course
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{courses[0].title}</div>
            <p className="text-xs text-muted-foreground">
              Based on user engagement
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
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
      </div>
    </div>
  );
}
