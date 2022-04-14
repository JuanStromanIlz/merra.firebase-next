import { deleteFromFolder } from "../services/firebase";

const deleteDoc = async (id, folder) => {
  try {
    await deleteFromFolder(id, folder);
  } catch ({ message }) {
    console.error(message);
  }
};

export default deleteDoc;
