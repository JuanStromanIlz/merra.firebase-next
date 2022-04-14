import {
  createItem as createItemService,
  updateItem as updateItemService,
} from "../services/firebase";
import { uploadImages } from "../services/storage";

const createDoc = async (values, folder) => {
  try {
    const { newImages, title, ...rest } = values;
    let { id } = await createItemService(folder, { ...rest, title });
    let files = await newImages.map(({ data }) => data);
    let urls = await uploadImages(files, id);
    await updateItemService(folder, {
      id,
      images: [...urls],
    });
  } catch ({ message }) {
    console.error(message);
  }
};

export default createDoc;
