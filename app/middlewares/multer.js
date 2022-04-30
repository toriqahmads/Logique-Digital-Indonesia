const fs = require('fs');
const path = require('path');
const multer = require('multer');
const flaverr = require('flaverr');
const mime = require('../../config/mime');

const photoPath = path.resolve('public/photos');

const allPath = [photoPath];

allPath.forEach((item) => {
  if (!fs.existsSync(item)) {
    fs.mkdirSync(item, { recursive: true });
  }
});

const document = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, photoPath);
  },
  filename(req, file, cb) {
    cb(
      null,
      // fieldname-123171.extension
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExts = mime.image;
  const check = allowedExts.find((item) => item === file.mimetype);

  if (!check) {
    cb(flaverr('E_BAD_REQUEST', Error('File not allowed')));
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: document,
  fileFilter,
  limits: { fileSize: 10 * 1000 * 1000, files: 10 }, // limit 10MB & 1 file
})

module.exports = { upload };
