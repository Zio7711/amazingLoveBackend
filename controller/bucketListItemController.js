const { NotFoundError } = require("../errors/index.js");
const { StatusCodes } = require("http-status-codes");

const models = require("../models/index.js");
const sharp = require("sharp");
const { BucketList, Couple } = models;

const createBucketListItem = async (req, res) => {
  const bucketList = req.body;

  const bucketListItemCreated = await BucketList.create(bucketList);

  res.status(StatusCodes.CREATED).json({
    bucketListItemCreated,
  });
};

const getAllBucketListItemsByCoupleId = async (req, res) => {
  const coupleId = req.params.coupleId;
  const bucketList = await BucketList.findAll({
    where: { coupleId },
    attributes: {
      exclude: ["image"],
    },
    order: [["createdAt", "DESC"]],
  });

  if (!bucketList) {
    throw new NotFoundError("BucketListItems not found");
  }

  res.status(StatusCodes.OK).json({
    bucketList,
  });
};

const updateBucketListItemById = async (req, res) => {
  const bucketListItem = req.body;

  const imageFile = req.file.buffer;

  // const imageFile = fs.readFileSync(req.file.path);

  const imageURL = `${process.env.BASEURL}/bucketList/${
    req.params.itemId
  }/image?${Date.now()}`;

  const bucketListItemToBeUpdated = {
    ...bucketListItem,
    image: imageFile,
    imageURL,
  };

  const bucketListItemUpdated = await BucketList.update(
    bucketListItemToBeUpdated,
    {
      where: { id: req.params.itemId },
      returning: true,
      plain: true,
    }
  );

  const bucketListItemUpdatedData = bucketListItemUpdated[1].dataValues;

  res.status(StatusCodes.OK).json({
    bucketListItemUpdated: {
      id: bucketListItemUpdatedData.id,
      title: bucketListItemUpdatedData.title,
      description: bucketListItemUpdatedData.description,
      isCompleted: bucketListItemUpdatedData.isCompleted,
      date: bucketListItemUpdatedData.date,
      coupleId: bucketListItemUpdatedData.coupleId,
      location: bucketListItemUpdatedData.location,
      imageURL: bucketListItemUpdatedData.imageURL,
    },
  });
};

const getImage = async (req, res) => {
  const bucketListItem = await BucketList.findOne({
    where: { id: req.params.itemId },
    attributes: ["image"],
  });

  if (!bucketListItem) {
    throw new NotFoundError("BucketListItem not found");
  }
  const image = bucketListItem.image;

  //shrink image size to speed up loading images
  const resizedImage = await sharp(image).jpeg({ quality: 10 }).toBuffer();

  res.setHeader("Content-Type", "image/jpg");
  res.send(resizedImage);
};

const deleteBucketListItemById = async (req, res) => {
  const bucketListItem = await BucketList.destroy({
    where: { id: req.params.itemId },
  });

  if (!bucketListItem) {
    throw new NotFoundError("BucketListItem not found");
  }

  res.status(StatusCodes.OK).json({
    bucketListItemId: Number(req.params.itemId),
  });
};

module.exports = {
  createBucketListItem,
  getAllBucketListItemsByCoupleId,
  updateBucketListItemById,
  getImage,
  deleteBucketListItemById,
};
