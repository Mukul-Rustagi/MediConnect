// middleware/uploadMiddleware.js
// Use the uploaders from utils/multerHelper
const { uploadMeetingFiles } = require('../utils/multerHelper');
const upload = require('../utils/multerHelper');

module.exports = upload;
module.exports.uploadMeetingFiles = uploadMeetingFiles;
