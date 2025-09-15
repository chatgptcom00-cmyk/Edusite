
'use client';

import { useEffect, useState } from 'react';

export default function Logo() {
  const [logoText, setLogoText] = useState('EduSite');

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLogoText = localStorage.getItem('logo-text');
      if (storedLogoText) {
        setLogoText(storedLogoText);
      }
    };

    handleStorageChange(); // Initial load

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <span className="font-headline text-2xl font-bold sm:inline-block">
      {logoText}
    </span>
  );
}
