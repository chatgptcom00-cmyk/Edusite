
import { doc, getDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Heart, Star, UserCircle } from 'lucide-react';
import SubcategoryClientPage from '@/components/subcategory-client-page';


export type Subcategory = {
    id: string;
    name: string;
    description: string;
};

export type Lecture = {
    id: string;
    title: string;
    videoUrl?: string;
    pdfUrl?: string;
};

export type Quiz = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

type Course = {
    id: string;
    name: string;
    description: string;
    author: string; // Assuming author is stored in the course doc
    rating: number; // Assuming rating is stored
};

async function getCourseData(id: string): Promise<{ course: Course, subcategories: Subcategory[] } | null> {
    try {
        const courseRef = doc(db, 'courses', id);
        const courseSnap = await getDoc(courseRef);

        if (!courseSnap.exists()) {
            return null;
        }

        const courseData = courseSnap.data();
        const course: Course = {
            id: courseSnap.id,
            name: courseData.name || 'Unnamed Course',
            description: courseData.description || '',
            author: 'PixS Organisation', // Placeholder
            rating: 4.8, // Placeholder
        };

        const subcategoriesRef = collection(db, 'courses', id, 'subcategories');
        const subcategoriesQuery = query(subcategoriesRef, orderBy('name'));
        const subcategoriesSnap = await getDocs(subcategoriesQuery);
        
        const subcategories: Subcategory[] = subcategoriesSnap.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name || 'Unnamed Subcategory',
            description: doc.data().description || '',
        }));

        return { course, subcategories };
    } catch (error) {
        console.error("Error fetching course data:", error);
        return null;
    }
}


export default async function CoursePage({ params }: { params: { id: string } }) {
    const data = await getCourseData(params.id);

    if (!data) {
        notFound();
    }

    const { course, subcategories } = data;
    
    // The main data fetching happens on the server. We pass the initial data to the client component.
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

                        {/* Client Component for interactive tabs */}
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
