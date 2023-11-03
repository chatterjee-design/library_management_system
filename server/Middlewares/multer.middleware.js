import path from "path";
import multer from "multer";


const upload = multer({
  //file will be uploaded on the upload folder
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: "../uploads",
    filename: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname);

    if (
      ext !== ".jpg" &&
      ext !== ".jpeg"&& 
      ext !== ".webp"&& 
      ext !== ".png" &&
      ext !== ".mp4"
    ) {
        console.log("Extension not supported")
        cb(new Error ("Invalid file extension: " + ext),false)
        return;
    }
    cb(null, true);
  },
});

export default upload;
