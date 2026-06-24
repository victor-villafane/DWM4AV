import multer from "multer";
import sharp from "sharp";
import fs from "fs/promises";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const numeroAleatorio = Math.floor(Math.random() * 10000000);
    return cb(
      null,
      numeroAleatorio + "_" + file.originalname.trim().replace(/ /g, "_")
    );
  },
});

export async function resizeImage(req, res, next) {
  if (!req.file) return next();
  const numeroAleatorio = Math.floor(Math.random() * 10000000);
  const filename = "uploads/" + numeroAleatorio + ".webp";

  try {
    await sharp(req.file.path).resize(500).webp().toFile(filename);

    await fs.unlink("uploads/"+req.file.filename);
    req.file.filename = numeroAleatorio + ".webp";
    next();
  } catch (error) {}
}

export const upload = multer({ storage });
