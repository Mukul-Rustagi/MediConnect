const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Get the project root (one level up from 'backend')
const projectRoot = path.resolve(__dirname, '../../');

// General uploads directory
const uploadDir = path.join(projectRoot, 'backend', 'storage', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Meeting files directory
const meetingFilesDir = path.join(uploadDir, 'doctor_meeting_files');
if (!fs.existsSync(meetingFilesDir)) {
  fs.mkdirSync(meetingFilesDir, { recursive: true });
}

// General storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Storage for meeting files
const meetingFilesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, meetingFilesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and PDF are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadMeetingFiles = multer({
  storage: meetingFilesStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;
module.exports.uploadMeetingFiles = uploadMeetingFiles;
