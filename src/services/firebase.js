import { db } from '../firebase';
import {
  query,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  collection,
  where,
  limit,
  serverTimestamp,
} from 'firebase/firestore';

const folderRef = (folder) => collection(db, folder);

const itemRef = (id, folder) => doc(db, folder, id);

export const getFolder = (folder) => {
  let q = query(folderRef(folder), orderBy('created', 'desc'));
  return getDocs(q);
};

export const getItemByTitle = (url, folder) => {
  let q = query(folderRef(folder), where('url', '==', url), limit(1));
  return getDocs(q);
};

export const getRelatedPostByTags = (doc = {}, folder) => {
  const { tags = [], url = '' } = doc;
  let q = query(
    folderRef(folder),
    where('tags', 'array-contains-any', tags),
    where('url', '!=', url)
  );
  return getDocs(q);
};

export const createItem = (folder, data) => {
  return addDoc(folderRef(folder), {
    ...data,
    created: serverTimestamp(),
  });
};

export const updateItem = (folder, data) => {
  const { id, created, ...rest } = data;
  return updateDoc(itemRef(id, folder), {
    ...rest,
  });
};

export const deleteFromFolder = (id, folder) => {
  return deleteDoc(itemRef(id, folder));
};
