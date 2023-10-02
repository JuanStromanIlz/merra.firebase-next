import { POSTS } from 'src/services/foldersNames';
import { updateItem as updateItemService } from '../services/firebase';
import {
  uploadFiles as uploadFilesService,
  deleteFiles as deleteFilesService,
} from '../services/storage';
import { slugify } from './utils';

const updateDoc = async (values, folder = POSTS) => {
  try {
    const { id, newFiles, deleteFiles, files, title, ...rest } = values;
    let urls = [];
    if (newFiles.length > 0) {
      let uploadFiles = await uploadFilesService(newFiles, id);
      urls.push(...uploadFiles);
    }
    if (deleteFiles.length > 0) {
      await deleteFilesService(deleteFiles, id);
    }
    await updateItemService(folder, {
      id,
      ...rest,
      title,
      url: slugify(title),
      files: [...files, ...urls],
    });
  } catch (err) {
    throw err;
  }
};

export default updateDoc;
