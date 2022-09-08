import multer from 'multer';

import { uploadDir } from '../server';
import { transformDateTime } from '../utils/transform';

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, transformDateTime() + '-' + file.originalname);
  }
});
