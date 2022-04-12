import { updateItem as updateItemService } from "../services/firebase";
import {
  uploadImages as uploadImagesService,
  deleteImages as deleteImagesService,
} from "../services/storage";
import { PUBLICACIONES } from "../services/foldersNames";

export const updateItem = async (values, folder) => {
  try {
    const { id, newImages, deleteImages, images, title, ...rest } = values;
    let urls = [];
    if (newImages.length > 0) {
      let files = await newImages.map(({ data }) => data);
      let uploadFiles = await uploadImagesService(files, id);
      urls.push(...uploadFiles);
    }
    if (deleteImages.length > 0) {
      await deleteImagesService(deleteImages, id);
    }
    await updateItemService(folder, {
      id,
      title,
      images: [...images, ...urls],
      ...rest,
    });
  } catch ({ message }) {
    return message;
  }
};

export const updatePublicationItem = async (values, folder = PUBLICACIONES) => {
  try {
    await updateItem(folder, values);
  } catch ({ message }) {
    console.error(message);
  }
};
