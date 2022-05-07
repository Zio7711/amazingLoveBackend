const { NotFoundError } = require("../errors/index.js");
const { StatusCodes } = require("http-status-codes");

const models = require("../models/index.js");
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
  });

  if (!bucketList) {
    throw new NotFoundError("BucketListItems not found");
  }

  res.status(StatusCodes.OK).json({
    bucketList,
  });
};

const updateBucketListItemById = async (req, res) => {
  console.log("req", req.file);
  const bucketListItem = req.body;

  const bucketListItemToBeUpdated = {
    ...bucketListItem,
    image: req.file.filename,
  };

  const bucketListItemUpdated = await BucketList.update(
    bucketListItemToBeUpdated,
    {
      where: { id: req.params.id },
    }
  );

  res.status(StatusCodes.OK).json({
    bucketListItemUpdated,
  });
};

module.exports = {
  createBucketListItem,
  getAllBucketListItemsByCoupleId,
  updateBucketListItemById,
};
