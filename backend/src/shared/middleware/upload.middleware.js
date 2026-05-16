import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "uploads/avatars",
    filename: (req, file, cb) => {
        cb(null, `avatar-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

export default upload;