
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from '../login/page';

export default function SignupPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to login page as Google Sign-In handles both
        router.replace('/login');
    }, [router]);

    // Render the login page's content while redirecting
    return <LoginPage />;
}
