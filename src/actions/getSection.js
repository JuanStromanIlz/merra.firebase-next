import { POSTS } from "src/services/foldersNames";
import { getFolder as getFolderService } from "../services/firebase";

const getSection = async (folder = POSTS) => {
  try {
    const data = [];
    const res = await getFolderService(folder);
    res.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  } catch ({ message }) {
    console.error(message);
  }
};

export default getSection;
