// middleware/uploadMiddleware.js
const multer = require('multer');

// Set storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './storage/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Define file upload limit and types
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10 MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|jpeg|jpg|png/;
    const extname = fileTypes.test(file.mimetype);
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Files must be PDF, JPEG, PNG');
    }
  },
});

module.exports = upload;
