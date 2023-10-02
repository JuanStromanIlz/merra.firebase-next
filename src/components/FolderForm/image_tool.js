/* eslint-disable import/no-anonymous-default-export */
import Image from '@editorjs/image';

export default class extends Image {
  removed() {
    const deleteFn = this.config.uploader.delete;
    if (deleteFn) {
      deleteFn(this.data.file);
    }
  }
}
