import { POSTS } from 'src/services/foldersNames';
import { getItemByTitle } from '../services/firebase';

const getDoc = async (title, folder = POSTS) => {
  try {
    let data;
    let docs = await getItemByTitle(title, folder);
    docs.forEach((doc) => {
      data = {
        id: doc.id,
        ...doc.data(),
        created: doc.data().created.toJSON(),
      };
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export default getDoc;
