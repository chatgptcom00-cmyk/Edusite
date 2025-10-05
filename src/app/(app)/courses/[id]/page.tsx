
'use client';

import { doc, getDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Heart, Star, UserCircle } from 'lucide-react';
import SubcategoryClientPage from '@/components/subcategory-client-page';
import { useEffect, useState } from 'react';


export type Subcategory = {
    id: string;
    name: string;
    description: string;
};

type Course = {
    id: string;
    name: string;
    description: string;
    author: string;
    rating: number; 
};


export default function CoursePage({ params }: { params: { id: string } }) {
    const firestore = useFirestore();
    const [course, setCourse] = useState<Course | null>(null);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const courseRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'courses', params.id);
    }, [firestore, params.id]);

    const subcategoriesRef = useMemoFirebase(() => {
        if (!courseRef) return null;
        return collection(courseRef, 'subcategories');
    }, [courseRef]);

    useEffect(() => {
        if (!courseRef || !subcategoriesRef) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const courseSnap = await getDoc(courseRef);
                if (!courseSnap.exists()) {
                    notFound();
                    return;
                }

                const courseData = courseSnap.data();
                setCourse({
                    id: courseSnap.id,
                    name: courseData.name || 'Unnamed Course',
                    description: courseData.description || '',
                    author: 'PixS Organisation',
                    rating: 4.8, 
                });

                const subcategoriesQuery = query(subcategoriesRef, orderBy('name', 'asc'));
                const subcategoriesSnap = await getDocs(subcategoriesQuery);
                const subcategoriesData: Subcategory[] = subcategoriesSnap.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name || 'Unnamed Subcategory',
                    description: doc.data().description || '',
                }));
                setSubcategories(subcategoriesData);

            } catch (error) {
                console.error("Error fetching course data:", error);
                // In a real app, you might want to show an error state
                setCourse(null);
                setSubcategories([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [courseRef, subcategoriesRef]);

    if (isLoading) {
        // You can return a skeleton loader here
        return <div>Loading...</div>;
    }

    if (!course) {
        notFound();
    }

    return (
        <div className="bg-card/50">
            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="mb-4">
                            <Badge variant="secondary" className="mb-2">{course.author}</Badge>
                            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary lg:text-5xl">
                                {course.name}
                            </h1>
                            <p className="mt-4 text-lg text-foreground/80">
                                {course.description}
                            </p>
                        </div>

                        <SubcategoryClientPage courseId={course.id} initialSubcategories={subcategories} />

                    </div>
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-lg border bg-card p-6 shadow-sm">
                            <h2 className="font-headline text-2xl font-semibold mb-4">
                                About this category
                            </h2>
                            <p className="text-foreground/70">{course.description}</p>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <UserCircle className="h-5 w-5 text-muted-foreground" />
                                    <span className="font-medium">{course.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                                    <span className="font-bold">{course.rating.toFixed(1)}</span>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col gap-2">
                                <Button className="w-full font-semibold" size="lg">
                                    <Download className="mr-2 h-5 w-5" />
                                    Download Materials
                                </Button>
                                <Button variant="outline" className="w-full font-semibold" size="lg">
                                    <Heart className="mr-2 h-5 w-5" />
                                    Save for Later
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
