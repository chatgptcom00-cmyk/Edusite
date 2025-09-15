
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { courses, getCourseById, iconMap, Course } from '@/lib/courses';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const [course, setCourse] = useState<Course | null>(null);
  const [icon, setIcon] = useState('');
  const [iconColor, setIconColor] = useState('');
  const [isDownloadable, setIsDownloadable] = useState(false);

  useEffect(() => {
    const courseId = params.id as string;
    const foundCourse = getCourseById(courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      setIcon(foundCourse.icon);
      setIconColor(foundCourse.iconColor);
      setIsDownloadable(foundCourse.isDownloadable);
    } else {
      // Handle course not found, maybe redirect
    }
  }, [params.id]);

  const handleSave = () => {
    if (course) {
      // In a real app, you would save this to your database.
      // For now, we'll just show a toast.
      console.log('Saving changes:', {
        ...course,
        icon,
        iconColor,
        isDownloadable,
      });
      toast({
        title: 'Course Saved!',
        description: `${course.title} has been updated.`,
      });
      // Note: This won't persist because the `courses` array is in-memory.
    }
  };

  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading course...</p>
      </div>
    );
  }

  const IconPreview = iconMap[icon as keyof typeof iconMap];
  const iconNames = Object.keys(iconMap);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/courses">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to courses</span>
          </Link>
        </Button>
        <h1 className="font-headline text-3xl font-bold">Edit Course</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>
            Update the icon, branding, and settings for this course.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
             <div className="flex items-start gap-8">
              <div className="space-y-2">
                <Label>Icon Preview</Label>
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-lg"
                  style={{ backgroundColor: iconColor }}
                >
                  {IconPreview && (
                    <IconPreview className="h-12 w-12 text-white" />
                  )}
                </div>
              </div>
              <div className="flex-1 space-y-2">
                 <Label htmlFor="icon-color">Icon Color</Label>
                <Input
                  id="icon-color"
                  type="color"
                  value={iconColor}
                  onChange={e => setIconColor(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Label>Choose an Icon</Label>
            <ScrollArea className="w-full">
              <div className="grid grid-cols-6 gap-4 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
                {iconNames.map(iconName => {
                  const IconComponent = iconMap[iconName];
                  return (
                    <button
                      key={iconName}
                      onClick={() => setIcon(iconName)}
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-colors",
                        icon === iconName ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2" : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <IconComponent className="h-6 w-6" />
                      <span className="text-xs truncate">{iconName}</span>
                    </button>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          
           <div className="space-y-2">
            <Label>Or Upload Custom Icon</Label>
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="logo-upload"
                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted hover:bg-secondary"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="mb-2 h-6 w-6 text-muted-foreground" />
                  <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    SVG, PNG, or JPG
                  </p>
                </div>
                <Input id="logo-upload" type="file" className="hidden" />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Course Settings</h3>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="downloadable">Downloadable Content</Label>
                <p className="text-sm text-muted-foreground">
                  Allow users to download course materials.
                </p>
              </div>
              <Switch
                id="downloadable"
                checked={isDownloadable}
                onCheckedChange={setIsDownloadable}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="font-semibold" size="lg">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
