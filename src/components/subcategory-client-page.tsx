
'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { PlayCircle, FileText, Puzzle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

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

type SubcategoryClientPageProps = {
  courseId: string;
  initialSubcategories: Subcategory[];
};

export default function SubcategoryClientPage({
  courseId,
  initialSubcategories,
}: SubcategoryClientPageProps) {
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string | null>(
    initialSubcategories[0]?.id || null
  );
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeSubcategoryId) {
      const fetchContent = async () => {
        setIsLoading(true);
        try {
          // Fetch lectures
          const lecturesRef = collection(db, 'courses', courseId, 'subcategories', activeSubcategoryId, 'courses');
          const lecturesQuery = query(lecturesRef, orderBy('title', 'asc'));
          const lecturesSnap = await getDocs(lecturesQuery);
          const lecturesData = lecturesSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Lecture[];
          setLectures(lecturesData);

          // Fetch quizzes
          const quizzesRef = collection(db, 'courses', courseId, 'subcategories', activeSubcategoryId, 'quizzes');
          const quizzesQuery = query(quizzesRef, orderBy('question', 'asc'));
          const quizzesSnap = await getDocs(quizzesQuery);
          const quizzesData = quizzesSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Quiz[];
          setQuizzes(quizzesData);

        } catch (error) {
          console.error('Error fetching subcategory content:', error);
          setLectures([]);
          setQuizzes([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchContent();
    }
  }, [activeSubcategoryId, courseId]);
  
  const renderContent = (
    <>
      <TabsTrigger value="lectures">
        <PlayCircle className="mr-2 h-5 w-5" />
        Lectures
      </TabsTrigger>
      <TabsTrigger value="quizzes">
        <Puzzle className="mr-2 h-5 w-5" />
        Quizzes
      </TabsTrigger>
    </>
  )

  const renderLectures = () => (
    <Accordion type="single" collapsible className="w-full">
      {lectures.map((lecture, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="px-6">
          <AccordionTrigger className="font-medium hover:no-underline">
            <div className="flex items-center gap-3">
              <CheckCircle2 className={`h-6 w-6 transition-colors text-muted-foreground`} />
              <span>{lecture.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-12 pb-4">
            {lecture.videoUrl && (
                <Link href={lecture.videoUrl} target="_blank" className="text-primary hover:underline flex items-center gap-2">
                    <PlayCircle className="h-4 w-4" /> Watch Video
                </Link>
            )}
            {lecture.pdfUrl && (
                 <Link href={lecture.pdfUrl} target="_blank" className="text-primary hover:underline flex items-center gap-2 mt-2">
                    <FileText className="h-4 w-4" /> View PDF
                </Link>
            )}
            {!lecture.videoUrl && !lecture.pdfUrl && (
                <p className="text-sm text-muted-foreground">No materials for this lecture.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  const renderQuizzes = () => (
     <div className="p-6 space-y-4">
        {quizzes.map((quiz, index) => (
            <div key={index} className="rounded-lg border p-4">
                <p className="font-medium">{index + 1}. {quiz.question}</p>
                <div className="mt-2 space-y-2">
                    {quiz.options.map((option, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                            <input type="radio" name={`quiz-${index}`} id={`quiz-${index}-option-${i}`} className="accent-primary" />
                            <label htmlFor={`quiz-${index}-option-${i}`}>{option}</label>
                        </div>
                    ))}
                </div>
            </div>
        ))}
     </div>
  );

  return (
    <div className="mt-8 rounded-lg border bg-card shadow-sm">
      {initialSubcategories.length > 0 ? (
        <Tabs defaultValue={initialSubcategories[0]?.id} onValueChange={setActiveSubcategoryId} className="w-full">
            <TabsList className="m-2">
                {initialSubcategories.map(sub => (
                    <TabsTrigger key={sub.id} value={sub.id}>
                        {sub.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            
            {initialSubcategories.map(sub => (
                <TabsContent key={sub.id} value={sub.id} className="p-0">
                    <div className="border-b">
                        <p className="text-muted-foreground px-6 pb-4">{sub.description}</p>
                    </div>
                    <Tabs defaultValue="lectures" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 m-0 rounded-none border-b">
                            {renderContent}
                        </TabsList>
                        {isLoading ? (
                            <div className="p-6 space-y-4">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ) : (
                            <>
                                <TabsContent value="lectures" className="p-0">
                                    {lectures.length > 0 ? renderLectures() : <p className="p-6 text-center text-muted-foreground">No lectures available for this subcategory.</p>}
                                </TabsContent>
                                <TabsContent value="quizzes" className="p-0">
                                    {quizzes.length > 0 ? renderQuizzes() : <p className="p-6 text-center text-muted-foreground">No quizzes available for this subcategory.</p>}
                                </TabsContent>
                            </>
                        )}
                    </Tabs>
                </TabsContent>
            ))}
        </Tabs>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          <p>No subcategories have been added to this course yet.</p>
        </div>
      )}
    </div>
  );
}

