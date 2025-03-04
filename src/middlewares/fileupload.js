const multer = require('multer');
const path = require('path');
const uploadDir = path.join(__dirname,"..","..", "public/profiles");

console.log("path",uploadDir)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir); // Save images in "uploads/" folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Preserve file extension
    },
  });
  
const profileUpload = multer({
    storage: storage
});
module.exports  = profileUpload;