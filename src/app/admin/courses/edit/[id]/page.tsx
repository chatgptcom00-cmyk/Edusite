
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

type Course = {
  name: string;
  description: string;
};

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, 'courses', courseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCourse(docSnap.data() as Course);
        } else {
          toast({
            variant: 'destructive',
            title: 'Not Found',
            description: 'This course does not exist.',
          });
          router.push('/admin/courses');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load course data.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, router, toast]);

  const handleSave = async () => {
    if (!course) return;

    setIsSaving(true);
    try {
      const docRef = doc(db, 'courses', courseId);
      await updateDoc(docRef, {
        name: course.name,
        description: course.description,
      });
      toast({
        title: 'Course Updated!',
        description: 'The changes have been saved successfully.',
      });
    } catch (error) {
      console.error('Error updating course:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save changes.',
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (course) {
        setCourse(prev => prev ? { ...prev, [name]: value } : null);
    }
  }

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
        {isLoading ? (
          <CardContent className="p-6 space-y-6">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-5 w-3/4" />
            <div className="space-y-4 pt-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        ) : course ? (
          <>
            <CardHeader>
              <CardTitle>Editing: {course.name}</CardTitle>
              <CardDescription>
                Update the details for this main course category.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={course.name}
                  onChange={handleInputChange}
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={course.description}
                  onChange={handleInputChange}
                  rows={4}
                  disabled={isSaving}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="font-semibold"
                size="lg"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </>
        ) : (
          <CardContent className="p-6 text-center">
            <p>Course data could not be loaded.</p>
          </CardContent>
        )}
      </Card>

      {/* Placeholder for future subcategory management */}
      <Card>
        <CardHeader>
            <CardTitle>Subcategories</CardTitle>
            <CardDescription>Manage subcategories for this course.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground text-center py-8">Subcategory management will be added here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
