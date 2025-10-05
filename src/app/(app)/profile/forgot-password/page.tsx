
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
import { MailCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendVerification = async () => {
    if (!email) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter your email address.',
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setIsEmailSent(true);
      toast({
        title: 'Verification Link Sent',
        description: 'Please check your email to reset your password.',
      });
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.code === 'auth/user-not-found'
            ? 'No user found with this email.'
            : 'Failed to send reset email. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        {!isEmailSent ? (
          <>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Forgot Password</CardTitle>
              <CardDescription>
                Enter your email and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <Button className="w-full font-semibold" onClick={handleSendVerification} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Send Verification Link'}
              </Button>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <MailCheck className="h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="font-headline text-2xl mb-2">Check Your Email</CardTitle>
            <CardDescription className="mb-6">
              We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>. Please follow the instructions in the email to continue.
            </CardDescription>
            <Button className="w-full font-semibold" onClick={() => router.push('/login')}>
              Return to Login <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
