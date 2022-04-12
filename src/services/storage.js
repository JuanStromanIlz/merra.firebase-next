import { storage as firebaseStorage } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

const storageRef = (path) => ref(firebaseStorage, path);

export const uploadImages = async (images, folder) => {
  try {
    if (images.length === 0) {
      return [];
    }
    let files = [];
    for (const image of images) {
      let imageRef = storageRef(`${folder}/${image.name}`);
      await uploadBytes(imageRef, image);
      let url = await getDownloadURL(imageRef);
      files.push({
        name: image.name,
        url,
      });
    }
    return files;
  } catch ({ message }) {
    return message;
  }
};

export const deleteImages = async (images, folder) => {
  try {
    if (images.length === 0) {
      return;
    }
    for (const image of images) {
      let imageRef = storageRef(`${folder}/${image.name}`);
      await deleteObject(imageRef);
    }
    return;
  } catch ({ message }) {
    return message;
  }
};
