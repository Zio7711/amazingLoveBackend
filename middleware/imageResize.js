const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outputFolder = "public/assets";

const imageResizeCallBack = async (req, res, next) => {
  const image = req.file;

  await sharp(image.path)
    .jpeg({ quality: 50 })
    .toFile(path.resolve(outputFolder, image.filename + "_full.jpg"));

  fs.unlinkSync(image.path);
  req.image = image.filename;

  next();
};

module.exports = imageResizeCallBack;
