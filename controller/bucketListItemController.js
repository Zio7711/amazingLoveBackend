import BucketListItem from '../models/BucketListItem.js';
import Couple from '../models/Couple.js';
import { NotFoundError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

const createBucketListITem = async (req, res) => {
  const bucketListItem = req.body;
  console.log(bucketListItem.couple);
  const bucketListItemCreated = await BucketListItem.create(bucketListItem);

  // find couple by id and add bucketListItem to couple
  const couple = await Couple.findById(bucketListItem.couple);
  couple.bucketList.push(bucketListItemCreated._id);
  await couple.save();

  res.status(StatusCodes.CREATED).json({
    bucketListItemCreated,
    couple,
  });
};

const getAllBucketListItemsByCoupleId = async (req, res) => {
  const coupleId = req.params.coupleId;
  const bucketListItems = await BucketListItem.find({ couple: coupleId });

  if (!bucketListItems) {
    throw new NotFoundError('BucketListItems not found');
  }

  res.status(StatusCodes.OK).json({
    bucketListItems,
  });
};

export { createBucketListITem, getAllBucketListItemsByCoupleId };
