// import multer from "multer";

// const storage = multer.diskStorage({
//   filename: function (req, file, callback) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     callback(null, uniqueSuffix + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });
// export default upload;

import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });
export default upload;
