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
import type { IProjectRepository } from '../interfaces/IProjectRepository';
import type { Project } from '../../types';

const COLLECTION_NAME = 'projects';

export class FirebaseProjectRepository implements IProjectRepository {
  private get collectionRef() {
    return collection(db, COLLECTION_NAME);
  }

  async getAll(): Promise<Project[]> {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
  }

  async getById(id: string): Promise<Project | null> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Project;
  }

  async getBySlug(slug: string): Promise<Project | null> {
    const q = query(this.collectionRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const docSnap = querySnapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() } as Project;
  }

  async getFeatured(): Promise<Project[]> {
    const q = query(this.collectionRef, where('featured', '==', true), where('published', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
  }

  async getPublished(): Promise<Project[]> {
    const q = query(this.collectionRef, where('published', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
  }

  async create(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const now = new Date().toISOString();
    
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    const newDoc = {
      ...cleanData,
      createdAt: now,
      updatedAt: now,
    };
    const docRef = await addDoc(this.collectionRef, newDoc);
    return { id: docRef.id, ...newDoc } as Project;
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    const docRef = doc(db, COLLECTION_NAME, id);
    
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    const updateData = { ...cleanData, updatedAt: new Date().toISOString() };
    await updateDoc(docRef, updateData);
    
    // Return updated document
    const updatedSnap = await getDoc(docRef);
    return { id: updatedSnap.id, ...updatedSnap.data() } as Project;
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }

  subscribe(callback: (data: Project[]) => void): () => void {
    const unsubscribe = onSnapshot(this.collectionRef, (snapshot) => {
      const projects = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
      callback(projects);
    });
    return unsubscribe;
  }
}

export const projectRepository = new FirebaseProjectRepository();
