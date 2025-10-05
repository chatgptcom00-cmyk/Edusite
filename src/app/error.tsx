
'use client' 

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center gap-4 text-center">
      <h2 className="font-headline text-3xl font-bold">Something went wrong!</h2>
      <p className="text-muted-foreground max-w-md">{error.message}</p>
      <Button
        onClick={
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
