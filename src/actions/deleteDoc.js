import { deleteFromFolder } from "../services/firebase";
import { deleteFiles } from "../services/storage";

const deleteDoc = async (doc) => {
  const { id, category, files } = doc;
  try {
    await deleteFromFolder(id, category);
    if (files.length > 0) {
      await deleteFiles(files, id);
    }
  } catch ({ message }) {
    console.error(message);
  }
};

export default deleteDoc;
