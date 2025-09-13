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
import { UploadCloud } from 'lucide-react';

export default function AdminUploadPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl">
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
              <Input id="title" placeholder="e.g., Introduction to Next.js 14" />
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
              <div className="flex items-center justify-center w-full">
                  <label htmlFor="media" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-secondary">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-muted-foreground">Video, Image, or Document file</p>
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
  );
}
