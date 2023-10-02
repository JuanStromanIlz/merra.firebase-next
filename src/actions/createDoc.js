import { POSTS } from 'src/services/foldersNames';
import {
  createItem as createItemService,
  updateItem as updateItemService,
} from '../services/firebase';
import { uploadFiles } from '../services/storage';
import { slugify } from './utils';

const createDoc = async (values, folder = POSTS) => {
  try {
    const { newFiles, title, deleteFiles, ...rest } = values;
    let { id } = await createItemService(folder, {
      ...rest,
      title,
      url: slugify(title),
    });
    let files = await uploadFiles(newFiles, id);
    await updateItemService(folder, {
      id,
      files,
    });
  } catch (err) {
    throw err;
  }
};

export default createDoc;
