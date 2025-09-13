'use client';

import { recommendCourses } from '@/ai/flows/course-recommendation';
import { Course } from '@/lib/courses';
import { useEffect, useState } from 'react';
import CourseCard from './course-card';
import { Skeleton } from './ui/skeleton';
import { Sparkles } from 'lucide-react';

export default function RecommendedCourses({
  courseId,
  allCourses,
}: {
  courseId: string;
  allCourses: Course[];
}) {
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecommendations = async () => {
      setLoading(true);
      try {
        const result = await recommendCourses({
          userViewingHistory: [courseId],
          allCourses: allCourses.map(c => ({
            id: c.id,
            title: c.title,
            description: c.description,
          })),
          numberOfRecommendations: 3,
        });

        if (result.recommendedCourseIds) {
          const recommended = result.recommendedCourseIds
            .map(id => allCourses.find(c => c.id === id))
            .filter((c): c is Course => !!c);
          setRecommendations(recommended);
        }
      } catch (error) {
        console.error('Failed to get course recommendations:', error);
      } finally {
        setLoading(false);
      }
    };
    getRecommendations();
  }, [courseId, allCourses]);

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="h-8 w-8 text-primary" />
        <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          You might also like
        </h2>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="mt-4 h-6 w-3/4" />
              <Skeleton className="mt-2 h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-3">
          {recommendations.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No recommendations available at this time.</p>
      )}
    </div>
  );
}
