import { POSTS } from "src/services/foldersNames";
import {
  createItem as createItemService,
  updateItem as updateItemService,
} from "../services/firebase";
import { uploadFiles } from "../services/storage";

const createDoc = async (values, folder = POSTS) => {
  try {
    const { newFiles, title, deleteFiles, ...rest } = values;
    let { id } = await createItemService(folder, { ...rest, title });
    let files = await newFiles.map(({ data, isVideo }) => ({
      data,
      isVideo,
    }));
    let urls = await uploadFiles(files, id);
    await updateItemService(folder, {
      id,
      files: [...urls],
    });
  } catch ({ message }) {
    console.error(message);
  }
};

export default createDoc;
