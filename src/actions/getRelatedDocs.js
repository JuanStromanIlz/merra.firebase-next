import { getRelatedPostByTags } from 'src/services/firebase';
import { POSTS } from 'src/services/foldersNames';

const getRelatedDocs = async (doc, folder = POSTS) => {
  try {
    const data = [];
    const res = await getRelatedPostByTags(doc, folder);
    res.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
        created: doc.data().created.toJSON(),
      });
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export default getRelatedDocs;
