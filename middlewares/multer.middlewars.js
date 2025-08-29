const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombreUnico = Date.now() + ext;
    cb(null, nombreUnico);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
    return cb(new Error("Extensión no soportada"), false);
  }
  cb(null, true);
};

module.exports = multer({ storage, fileFilter });
