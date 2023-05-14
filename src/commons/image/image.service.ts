// import * as multer from 'multer';

// export const multerOptions = {
//   limits: {
//     fileSize: 1024 * 1024 * 5, // 5MB,
//   },
//   storage: multer.diskStorage({
//     destination: 'public/uploads',
//     filename: function (req, file, callback) {
//       callback(null, Date.now().toString() + file.originalname);
//     },
//   }),
//   fileFilter: (req, file, callback) => {
//     if (['image/png', 'image/jpeg', 'image/gif'].includes(file.mimetype)) {
//       callback(null, true);
//     } else {
//       callback(new Error(`File type ${file.mimetype} is not allowed`), false);
//     }
//   },
// };
