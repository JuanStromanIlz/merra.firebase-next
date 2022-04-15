import { storage as firebaseStorage } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

const storageRef = (path) => ref(firebaseStorage, path);

export const uploadFiles = async (files, folder) => {
  try {
    if (files.length === 0) {
      return [];
    }
    let uploadFiles = [];
    for (const file of files) {
      const { data, isVideo } = file;
      let fileRef = storageRef(`${folder}/${data.name}`);
      await uploadBytes(fileRef, data);
      let url = await getDownloadURL(fileRef);
      uploadFiles.push({
        name: data.name,
        url,
        isVideo,
      });
    }
    return uploadFiles;
  } catch ({ message }) {
    return message;
  }
};

export const deleteFiles = async (files, folder) => {
  try {
    if (files.length === 0) {
      return;
    }
    for (const file of files) {
      let fileRef = storageRef(`${folder}/${file.name}`);
      await deleteObject(fileRef);
    }
    return;
  } catch ({ message }) {
    return message;
  }
};
