import { POSTS } from 'src/services/foldersNames';
import { getFolder as getFolderService } from '../services/firebase';

const getSection = async (folder = POSTS) => {
  try {
    const data = [];
    const res = await getFolderService(folder);
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

export default getSection;
