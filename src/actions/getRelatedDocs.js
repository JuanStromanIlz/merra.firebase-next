import { getRelatedPostByTags } from "src/services/firebase";
import { POSTS } from "src/services/foldersNames";

const getRelatedDocs = async (tags = [], folder = POSTS) => {
  try {
    const data = [];
    const res = await getRelatedPostByTags(tags, folder);
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
