import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../lib/firebase';
import type { AdminUser } from '../types';

export class FirebaseAuthService {
  private mapFirebaseUser(user: FirebaseUser): AdminUser {
    return {
      id: user.uid,
      email: user.email || '',
      name: user.displayName || 'User',
      role: 'user', // default to user instead of admin
      avatar: user.photoURL || undefined,
      createdAt: user.metadata.creationTime || new Date().toISOString(),
    };
  }

  async login(email: string, password: string): Promise<AdminUser> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return this.mapFirebaseUser(userCredential.user);
  }

  async signup(email: string, password: string): Promise<AdminUser> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return this.mapFirebaseUser(userCredential.user);
  }

  async logout(): Promise<void> {
    await firebaseSignOut(auth);
  }

  getCurrentUser(): AdminUser | null {
    const user = auth.currentUser;
    if (!user) return null;
    return this.mapFirebaseUser(user);
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }
}

export const authService = new FirebaseAuthService();
