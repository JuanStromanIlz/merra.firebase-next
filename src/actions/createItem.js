import {
  createItem as createItemService,
  updateItem as updateItemService,
} from "../services/firebase";
import { uploadImages } from "../services/storage";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  BLOG,
  PUBLICACIONES,
} from "../services/foldersNames";

export const createItem = async (values, folder) => {
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
    return message;
  }
};

// export const newEditorialItem = (values, folder = EDITORIAL) =>
//   createItem(values, folder);
// export const newArtworkItem = (values, folder = ARTWORK) =>
//   createItem(values, folder);
// export const newComercialItem = (values, folder = COMERCIAL) =>
//   createItem(values, folder);
// export const newFilmsItem = (values, folder = FILMS) =>
//   createItem(values, folder);
// export const newBlogItem = (values, folder = BLOG) =>
//   createItem(values, folder);
// export const newPublicationItem = (values, folder = PUBLICACIONES) =>
//   createItem(values, folder);
