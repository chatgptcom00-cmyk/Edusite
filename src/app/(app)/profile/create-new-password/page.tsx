
'use client';

import { useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { KeyRound } from 'lucide-react';

export default function CreateNewPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill in both password fields.',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Passwords do not match.',
      });
      return;
    }

    // Simulate saving the new password
    console.log('New password created:', password);

    toast({
      title: 'Password Reset Successful',
      description: 'You can now log in with your new password.',
    });

    router.push('/login');
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                 <KeyRound className="h-8 w-8 text-primary" />
            </div>
          <CardTitle className="font-headline text-2xl mt-4">Create New Password</CardTitle>
          <CardDescription>
            Your new password must be different from previous passwords.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
           <Button className="w-full font-semibold mt-4" onClick={handleResetPassword}>
            Reset Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
