
'use client';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from 'firebase/auth';

/**
 * Initiates the Google Sign-In flow using a popup.
 *
 * @param authInstance - The Firebase Auth instance.
 * @returns A promise that resolves with the user's credential upon successful sign-in.
 */
export function signInWithGoogle(authInstance: Auth): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(authInstance, provider);
}
