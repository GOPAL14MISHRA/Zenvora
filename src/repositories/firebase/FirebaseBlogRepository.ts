import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { IBlogRepository } from '../interfaces/IBlogRepository';
import type { BlogPost } from '../../types';

const COLLECTION_NAME = 'blogs';

export class FirebaseBlogRepository implements IBlogRepository {
  private get collectionRef() {
    return collection(db, COLLECTION_NAME);
  }

  async getAll(): Promise<BlogPost[]> {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogPost));
  }

  async getById(id: string): Promise<BlogPost | null> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as BlogPost;
  }

  async getBySlug(slug: string): Promise<BlogPost | null> {
    const q = query(this.collectionRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const docSnap = querySnapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() } as BlogPost;
  }

  async getFeatured(): Promise<BlogPost[]> {
    const q = query(this.collectionRef, where('featured', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogPost));
  }

  async getPublished(): Promise<BlogPost[]> {
    // Return all to match the user's request for admin panel and UI to be the same, 
    // or we can use getAll() in the components. I will just fetch all here too if it's called.
    // Wait, let's keep getPublished accurate but change the components.
    const q = query(this.collectionRef, where('published', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogPost));
  }

  async getByCategory(category: string): Promise<BlogPost[]> {
    const q = query(this.collectionRef, where('category', '==', category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogPost));
  }

  async create(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const now = new Date().toISOString();
    
    // Firestore does not support undefined values, so we filter them out.
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    const newDoc = {
      ...cleanData,
      createdAt: now,
      updatedAt: now,
    };
    const docRef = await addDoc(this.collectionRef, newDoc);
    return { id: docRef.id, ...newDoc } as BlogPost;
  }

  async update(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    const docRef = doc(db, COLLECTION_NAME, id);
    
    // Firestore does not support undefined values, so we filter them out.
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    const updateData = { ...cleanData, updatedAt: new Date().toISOString() };
    await updateDoc(docRef, updateData);
    
    const updatedSnap = await getDoc(docRef);
    return { id: updatedSnap.id, ...updatedSnap.data() } as BlogPost;
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }

  subscribe(callback: (data: BlogPost[]) => void): () => void {
    const unsubscribe = onSnapshot(this.collectionRef, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogPost));
      callback(posts);
    });
    return unsubscribe;
  }
}

export const blogRepository = new FirebaseBlogRepository();
