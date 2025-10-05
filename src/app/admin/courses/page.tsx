
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
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
import { Edit, BookCopy } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

type Course = {
  id: string;
  name: string;
  description: string;
};

export default function AdminCoursesPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    
    async function fetchCourses() {
      setIsLoading(true);
      try {
        const q = query(collection(firestore, 'courses'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const coursesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCourses();
  }, [isAuthenticated, firestore]);

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
            Manage Categories
          </CardTitle>
          <CardDescription>
            Review and edit main course categories from Firestore.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-5 w-48" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-20 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : courses.length > 0 ? (
                courses.map(course => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <BookCopy className="h-5 w-5 text-muted-foreground" />
                        <span>{course.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-sm truncate">
                      {course.description}
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No categories found in Firestore. Add one from the dashboard.
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
