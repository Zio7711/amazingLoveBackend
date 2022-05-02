import {
  createBucketListItem,
  getAllBucketListItemsByCoupleId,
} from "../controller/bucketListItemController.js";

import express from "express";

const bucketListRouter = express.Router();

bucketListRouter.route("/:coupleId").get(getAllBucketListItemsByCoupleId);
bucketListRouter.route("/new").post(createBucketListItem);
// bucketListRouter.route('/:id').delete(deleteMessage);

export default bucketListRouter;
