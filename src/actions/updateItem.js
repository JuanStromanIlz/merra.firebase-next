import { updateItem } from "../services/firebase";
import { uploadImages, deleteImages } from "../services/storage";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  BLOG,
  PUBLICACIONES,
} from "..services/foldersNames";

const imagesToDelete = (prevFolder, newFolder) => {
  let result = [];
  for (const image of prevFolder) {
    if (!newFolder.find(({ name }) => name === image.name)) {
      result.push(image);
    }
  }
  return result;
};

export const editFolder = async (values, folder) => {
  try {
    const { id, newImages, images, title: newTitle, ...rest } = values;
    let urls = [];
    if (newImages.length > 0) {
      let files = await newImages.map(({ data }) => data);
      let uploadFiles = await uploadImages(files, id);
      urls.push(...uploadFiles);
    }
    let deleteImages = imagesToDelete(info.images, images);
    await deleteImages(deleteImages, id);
    await updateItem(folder, {
      ...rest,
      id,
      title: newTitle,
      images: [...images, ...urls],
    });
  } catch ({ message }) {
    return message;
  }
};

// export const updateEditorialItem = (values, folder = EDITORIAL) =>
//   editFolder(values, folder);
// export const updateArtworkItem = (values, folder = ARTWORK) =>
//   editFolder(values, folder);
// export const updateComercialItem = (values, folder = COMERCIAL) =>
//   editFolder(values, folder);
// export const updateFilmsItem = (values, folder = FILMS) =>
//   editFolder(values, folder);
// export const updateBlogItem = (values, folder = BLOG) =>
//   editFolder(values, folder);
// export const updatePublicationItem = (values, folder = PUBLICACIONES) =>
//   editFolder(values, folder);
