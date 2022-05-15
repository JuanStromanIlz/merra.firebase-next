import { db } from "../firebase";
import {
  query,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  collection,
  Timestamp,
  where,
  limit,
} from "firebase/firestore";

const folderRef = (folder) => collection(db, folder);

const itemRef = (id, folder) => doc(db, folder, id);

export const getFolder = (folder) => {
  let q = query(folderRef(folder), orderBy("updated", "desc"));
  return getDocs(q);
};

export const getItemByTitle = (title, folder) => {
  let q = query(folderRef(folder), where("title", "==", title), limit(1));
  return getDocs(q);
};

export const createItem = (folder, data) => {
  return addDoc(folderRef(folder), {
    ...data,
    created: Timestamp.now().toJSON(),
    updated: Timestamp.now().toJSON(),
  });
};

export const updateItem = (folder, data) => {
  const { id, ...rest } = data;
  return updateDoc(itemRef(id, folder), {
    ...rest,
    updated: Timestamp.now().toJSON(),
  });
};

export const deleteFromFolder = (id, folder) => {
  return deleteDoc(itemRef(id, folder));
};
