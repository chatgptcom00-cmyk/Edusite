
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { courses as staticCourses } from '@/lib/courses';
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
import { useToast } from '@/hooks/use-toast';
import { BookOpen, TrendingUp } from 'lucide-react';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    const session = localStorage.getItem('admin-auth');
    if (session !== 'true') {
      router.push('/wp-admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);
  
  useEffect(() => {
    if (!isAuthenticated || !firestore) return;
    
    async function fetchCourseCount() {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'courses'));
        setCourseCount(querySnapshot.size);
      } catch (error) {
        console.error('Error fetching course count: ', error);
      }
    }

    fetchCourseCount();
  }, [isAuthenticated, firestore]);

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle || !courseDescription || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please fill in all fields.',
      });
      return;
    }
    setIsSubmitting(true);
    
    const coursesCollection = collection(firestore, 'courses');
    
    addDocumentNonBlocking(coursesCollection, {
        name: courseTitle,
        description: courseDescription,
        createdAt: serverTimestamp(),
    });

    toast({
        title: 'Category Added!',
        description: 'The new category has been successfully created.',
    });
    setCourseTitle('');
    setCourseDescription('');
    setCourseCount(prev => prev + 1);
    setIsSubmitting(false);
  };

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
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseCount}</div>
            <p className="text-xs text-muted-foreground">
              Live on the platform
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
            <div className="text-2xl font-bold truncate">
              {staticCourses[0]?.title || 'N/A'}
            </div>
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
                Add New Main Category
              </CardTitle>
              <CardDescription>
                Create a new main category in Firestore.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleAddCourse}>
                <div className="space-y-2">
                  <Label htmlFor="title">Category Name</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Advanced Web Development"
                    value={courseTitle}
                    onChange={e => setCourseTitle(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Category Description</Label>
                  <Textarea
                    id="description"
                    placeholder="A short summary of the category."
                    value={courseDescription}
                    onChange={e => setCourseDescription(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full font-semibold"
                  size="lg"
                  disabled={isSubmitting || !firestore}
                >
                  {isSubmitting ? 'Adding...' : 'Add Category to Firestore'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
