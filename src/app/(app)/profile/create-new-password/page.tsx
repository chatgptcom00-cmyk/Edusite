
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { KeyRound, Loader2 } from 'lucide-react';
import { useAuth } from '@/firebase';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';

function CreateNewPasswordComponent() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const searchParams = useSearchParams();

  const [oobCode, setOobCode] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('oobCode');
    if (!code) {
      setError('Invalid or missing password reset code.');
      setIsVerifying(false);
      return;
    }

    verifyPasswordResetCode(auth, code)
      .then(() => {
        setOobCode(code);
        setIsVerifying(false);
      })
      .catch((err) => {
        console.error(err);
        setError('The password reset link is invalid or has expired. Please try again.');
        setIsVerifying(false);
      });
  }, [searchParams, auth]);

  const handleResetPassword = async () => {
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
    
    if (!oobCode) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Cannot reset password without a valid code.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast({
        title: 'Password Reset Successful',
        description: 'You can now log in with your new password.',
      });
      router.push('/login');
    } catch (err) {
      console.error(err);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to reset password. The link may have expired.',
      });
      setIsSubmitting(false);
    }
  };

  if (isVerifying) {
    return (
       <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center text-center">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>
          <Button className="w-full font-semibold mt-4" onClick={handleResetPassword} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Reset Password'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CreateNewPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateNewPasswordComponent />
    </Suspense>
  )
}
