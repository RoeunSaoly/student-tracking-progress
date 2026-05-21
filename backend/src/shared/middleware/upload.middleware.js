import multer from "multer";
import path from "path";
import fs from "fs";

const createUploader = (destination, prefix) => {
  // Ensure the directory exists
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
      cb(null, `${prefix}-${Date.now()}${path.extname(file.originalname)}`);
    },
  });

  return multer({ storage });
};

// Default export: avatar uploader (keeps existing behaviour)
const upload = createUploader("uploads/avatars", "avatar");

// Named export: submission uploader
export const submissionUpload = createUploader("uploads/submissions", "submission");

export default upload;