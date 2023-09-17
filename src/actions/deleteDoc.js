import { POSTS } from 'src/services/foldersNames';
import { deleteFromFolder } from '../services/firebase';
import { deleteFiles } from '../services/storage';

const deleteDoc = async (doc, folder = POSTS) => {
  const { id, files } = doc;
  try {
    await deleteFromFolder(id, folder);
    if (files.length > 0) {
      await deleteFiles(files, id);
    }
  } catch (err) {
    throw err;
  }
};

export default deleteDoc;
