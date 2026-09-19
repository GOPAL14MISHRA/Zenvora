import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { db } from '../../lib/firebase';
import type { IInquiryRepository } from '../interfaces/IInquiryRepository';
import type { Inquiry, InquiryStatus } from '../../types';

const COLLECTION_NAME = 'inquiries';

export class FirebaseInquiryRepository implements IInquiryRepository {
  private get collectionRef() {
    return collection(db, COLLECTION_NAME);
  }

  async getAll(): Promise<Inquiry[]> {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Inquiry));
  }

  async getById(id: string): Promise<Inquiry | null> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Inquiry;
  }

  async create(data: Omit<Inquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Inquiry> {
    const now = new Date().toISOString();
    const newDoc = {
      ...data,
      status: 'New' as InquiryStatus,
      createdAt: now,
      updatedAt: now,
    };
    const docRef = await addDoc(this.collectionRef, newDoc);

    // Send email notification using EmailJS
    try {
      await emailjs.send(
        'service_95nmtg3',
        'template_w9vqt18',
        {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone || 'N/A',
          company: data.company || 'N/A',
          budget: data.budget || 'N/A',
          projectType: data.projectType || 'N/A',
          message: data.message,
        },
        '1DDUXcxN125-1jkgC'
      );
    } catch (e) {
      console.error('Failed to send email via EmailJS', e);
    }

    return { id: docRef.id, ...newDoc } as Inquiry;
  }

  async updateStatus(id: string, status: InquiryStatus): Promise<Inquiry> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData = { status, updatedAt: new Date().toISOString() };
    await updateDoc(docRef, updateData);
    
    const updatedSnap = await getDoc(docRef);
    return { id: updatedSnap.id, ...updatedSnap.data() } as Inquiry;
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }

  subscribe(callback: (data: Inquiry[]) => void): () => void {
    const unsubscribe = onSnapshot(this.collectionRef, (snapshot) => {
      const inquiries = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Inquiry));
      // sort by createdAt descending
      inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      callback(inquiries);
    });
    return unsubscribe;
  }
}

export const inquiryRepository = new FirebaseInquiryRepository();
