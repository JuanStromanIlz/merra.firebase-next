import { updateItem as updateItemService } from "../services/firebase";
import {
  uploadImages as uploadImagesService,
  deleteImages as deleteImagesService,
} from "../services/storage";
import { PUBLICACIONES } from "../services/foldersNames";

const imagesToDelete = (prevFolder, newFolder) => {
  let result = [];
  for (const image of prevFolder) {
    if (!newFolder.find(({ name }) => name === image.name)) {
      result.push(image);
    }
  }
  return result;
};

export const updateItem = async (values, folder) => {
  try {
    const { id, newImages, images, title, ...rest } = values;
    let urls = [];
    // if (newImages.length > 0) {
    //   let files = await newImages.map(({ data }) => data);
    //   let uploadFiles = await uploadImagesService(files, id);
    //   urls.push(...uploadFiles);
    // }
    // let deleteImages = imagesToDelete(info.images, images);
    // await deleteImagesService(deleteImages, id);
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
