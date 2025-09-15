
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
import { MailCheck, ArrowRight } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSendVerification = () => {
    if (!email) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter your email address.',
      });
      return;
    }
    // Simulate sending an email
    console.log(`Sending verification link to ${email}`);
    setIsEmailSent(true);
    toast({
      title: 'Verification Link Sent',
      description: 'Please check your email to reset your password.',
    });
  };

  const handleVerify = () => {
    // In a real app, this would be handled by a token in the URL
    router.push('/profile/create-new-password');
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
                />
              </div>
              <Button className="w-full font-semibold" onClick={handleSendVerification}>
                Send Verification Link
              </Button>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <MailCheck className="h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="font-headline text-2xl mb-2">Check Your Email</CardTitle>
            <CardDescription className="mb-6">
              We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>. Please click the button below to simulate verification.
            </CardDescription>
            <Button className="w-full font-semibold" onClick={handleVerify}>
              Verify & Reset Password <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
