
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, Heart, KeyRound, Camera } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type User = {
  name: string;
  email: string;
  image: string;
  initials: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const nameParts = (parsedUser.name || '').split(' ');
      const initials = (
        (nameParts[0]?.[0] || '') + (nameParts.length > 1 ? nameParts[nameParts.length - 1]?.[0] : '')
      ).toUpperCase();
      setUser({ ...parsedUser, image: '', initials });
    }
    setLoading(false);
  }, []);

  const menuItems = [
    {
      label: 'Password Reset',
      icon: KeyRound,
      href: '/profile/forgot-password',
      description: 'Manage your password'
    },
    { 
      label: 'Your Downloads', 
      icon: Download, 
      href: '/profile/downloads',
      description: 'Access downloadable content'
    },
    { 
      label: 'Saved Courses', 
      icon: Heart, 
      href: '/profile/saved-courses',
      description: 'View your saved courses'
    },
  ];
  
  if (loading) {
    return (
        <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
            <p>Loading profile...</p>
        </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
        <div className="text-center">
            <p className="mb-4">You need to be logged in to view this page.</p>
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto min-h-[calc(100vh-10rem)] max-w-4xl px-4 py-12 md:py-16">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">
            Profile Settings
          </CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="text-3xl">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-background"
              >
                <Camera className="h-5 w-5" />
                <span className="sr-only">Change Profile Picture</span>
              </Button>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 md:grid-cols-2">
            {menuItems.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-secondary"
              >
                <div className="rounded-lg bg-muted p-3 group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
