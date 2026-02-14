import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export interface Post {
  id: string;
  title: string;
  slug: string;
  tag: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  published: boolean;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export const TAGS = ['health', 'grow', 'faith', 'wellness', 'family', 'nutrition'] as const;

export async function getPublishedPosts(): Promise<Post[]> {
  const q = query(
    collection(db, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt,
    updatedAt: doc.data().updatedAt,
  })) as Post[];
}

export async function getAllPosts(): Promise<Post[]> {
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt,
    updatedAt: doc.data().updatedAt,
  })) as Post[];
}

export async function getPostById(id: string): Promise<Post | null> {
  const docRef = doc(db, 'posts', id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Post;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const q = query(collection(db, 'posts'), where('slug', '==', slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Post;
}

export async function createPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'posts'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updatePost(id: string, data: Partial<Omit<Post, 'id' | 'createdAt'>>): Promise<void> {
  const docRef = doc(db, 'posts', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, 'posts', id));
}

export async function uploadImage(file: File): Promise<string> {
  const storageRef = ref(storage, `posts/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
