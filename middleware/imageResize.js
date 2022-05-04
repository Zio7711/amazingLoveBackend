import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outputFolder = 'public/assets';

export default async (req, res, next) => {
  const image = req.file;

  await sharp(image.path)
    .jpeg({ quality: 50 })
    .toFile(path.resolve(outputFolder, image.filename + '_full.jpg'));

  fs.unlinkSync(image.path);
  req.image = image.filename;

  next();
};
