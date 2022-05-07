import BucketListItem from "../models/BucketListItem.js";
import Couple from "../models/Couple.js";
import { NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const createBucketListItem = async (req, res) => {
  const bucketListItem = req.body;
  console.log(bucketListItem.couple);
  const bucketListItemCreated = await BucketListItem.create(bucketListItem);

  // find couple by id and add bucketListItem to couple
  const couple = await Couple.findById(bucketListItem.couple);
  couple.bucketList.push(bucketListItemCreated.id);
  await couple.save();

  res.status(StatusCodes.CREATED).json({
    bucketListItemCreated,
    couple,
  });
};

const getAllBucketListItemsByCoupleId = async (req, res) => {
  const coupleId = req.params.coupleId;
  const bucketList = await BucketListItem.find({ couple: coupleId });

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

  const bucketListItemUpdated = await BucketListItem.findByIdAndUpdate(
    { id: req.params.itemId },
    bucketListItemToBeUpdated,
    { new: true, validateBeforeSave: true }
  );

  res.status(StatusCodes.OK).json({
    bucketListItemUpdated,
  });
};

export {
  createBucketListItem,
  getAllBucketListItemsByCoupleId,
  updateBucketListItemById,
};
