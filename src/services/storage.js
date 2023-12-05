import { slugify } from 'src/actions/utils';
import { storage as firebaseStorage } from '../firebase';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';

const storageRef = (path) => ref(firebaseStorage, path);

export const uploadSingleFile = async (file) => {
  try {
    const { name, ...rest } = file;
    const overrideName = slugify(name);
    let fileRef = storageRef(`/${overrideName}`);
    await uploadBytes(fileRef, file);
    let url = await getDownloadURL(fileRef);
    return {
      ...rest,
      name: overrideName,
      url,
    };
  } catch (err) {
    throw err;
  }
};

export const deleteSingleFile = async (file) => {
  try {
    const { name } = file;
    let fileRef = storageRef(`/${name}`);
    await deleteObject(fileRef);
    return;
  } catch (err) {
    throw err;
  }
};

export const uploadFiles = async (files, folder) => {
  try {
    if (files.length === 0) {
      return [];
    }
    let uploadFiles = [];
    for (const file of files) {
      const { data, ...rest } = file;
      const overrideName = slugify(data.name);
      let fileRef = storageRef(`${folder}/${overrideName}`);
      await uploadBytes(fileRef, data);
      let url = await getDownloadURL(fileRef);
      uploadFiles.push({
        name: overrideName,
        ...rest,
        url,
      });
    }
    return uploadFiles;
  } catch (err) {
    throw err;
  }
};

export const deleteFiles = async (files, folder = undefined) => {
  try {
    if (files.length === 0) {
      return;
    }
    for (const file of files) {
      const ref = folder ? `${folder}/${file.name}` : `/${file.name}`;
      let fileRef = storageRef(ref);
      await deleteObject(fileRef);
    }
    return;
  } catch (err) {
    throw err;
  }
};
