import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
// import Link from 'editorjs-hyperlink';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Image from './image_tool';
import Quote from '@editorjs/quote';
import { deleteSingleFile, uploadSingleFile } from 'src/services/storage';

export const EDITOR_JS_TOOLS = {
  header: Header,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  quote: Quote,
  list: List,
  delimiter: Delimiter,
  // hyperlink: Link,
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        vimeo: true,
      },
    },
  },
  image: {
    class: Image,
    config: {
      uploader: {
        async uploadByFile(file) {
          try {
            const img = await uploadSingleFile(file);
            return {
              success: 1,
              file: img,
            };
          } catch (err) {
            throw err;
          }
        },
        delete: (file) => deleteSingleFile(file),
      },
    },
  },
};
