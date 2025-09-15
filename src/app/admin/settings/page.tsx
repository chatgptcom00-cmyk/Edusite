
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logoText, setLogoText] = useState('EduSite');

  useEffect(() => {
    const session = localStorage.getItem('admin-auth');
    if (session !== 'true') {
      router.push('/wp-admin');
    } else {
      setIsAuthenticated(true);
      const storedLogoText = localStorage.getItem('logo-text');
      if (storedLogoText) {
        setLogoText(storedLogoText);
      }
    }
  }, [router]);

  const handleSave = () => {
    localStorage.setItem('logo-text', logoText);
    toast({
      title: 'Settings Saved',
      description: 'Your new settings have been saved successfully.',
    });
    // This is a bit of a trick to force a re-render of the header
    window.dispatchEvent(new Event('storage'));
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
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            General Settings
          </CardTitle>
          <CardDescription>
            Manage your site's appearance and branding.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="logo-text">Logo Text</Label>
            <Input
              id="logo-text"
              value={logoText}
              onChange={e => setLogoText(e.target.value)}
              placeholder="e.g., EduSite"
            />
             <p className="text-sm text-muted-foreground">
              This text will appear in the header as your site's logo.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Logo Image</Label>
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="logo-upload"
                className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted hover:bg-secondary"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="mb-4 h-8 w-8 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
                <Input id="logo-upload" type="file" className="hidden" />
              </label>
            </div>
             <p className="text-sm text-muted-foreground">
              Upload an image to use as your site's logo. If set, this will override the logo text.
            </p>
          </div>

           <Button onClick={handleSave} className="font-semibold" size="lg">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
