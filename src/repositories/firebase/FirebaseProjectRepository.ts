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

import { projects as initialProjects } from '../../data/projects';

const COLLECTION_NAME = 'projects';

export class FirebaseProjectRepository implements IProjectRepository {
  private get collectionRef() {
    return collection(db, COLLECTION_NAME);
  }

  async getAll(): Promise<Project[]> {
    try {
      const snapshot = await getDocs(this.collectionRef);
      if (snapshot.empty) return initialProjects;
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
    } catch {
      return initialProjects;
    }
  }

  async getById(id: string): Promise<Project | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return initialProjects.find(p => p.id === id || p.slug === id) ?? null;
      }
      return { id: docSnap.id, ...docSnap.data() } as Project;
    } catch {
      return initialProjects.find(p => p.id === id || p.slug === id) ?? null;
    }
  }

  async getBySlug(slug: string): Promise<Project | null> {
    try {
      const q = query(this.collectionRef, where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return initialProjects.find(p => p.slug === slug) ?? null;
      }
      const docSnap = querySnapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() } as Project;
    } catch {
      return initialProjects.find(p => p.slug === slug) ?? null;
    }
  }

  async getFeatured(): Promise<Project[]> {
    try {
      const q = query(this.collectionRef, where('featured', '==', true), where('published', '==', true));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return initialProjects.filter((p) => p.featured && p.published);
      }
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
    } catch {
      return initialProjects.filter((p) => p.featured && p.published);
    }
  }

  async getPublished(): Promise<Project[]> {
    try {
      const q = query(this.collectionRef, where('published', '==', true));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return initialProjects.filter((p) => p.published);
      }
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
    } catch {
      return initialProjects.filter((p) => p.published);
    }
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
      callback(projects.length > 0 ? projects : initialProjects);
    }, () => {
      callback(initialProjects);
    });
    return unsubscribe;
  }
}

export const projectRepository = new FirebaseProjectRepository();
