const {
  createBucketListItem,
  getAllBucketListItemsByCoupleId,
  updateBucketListItemById,
  getImage,
  deleteBucketListItemById,
} = require("../controller/bucketListItemController.js");

const express = require("express");
const imageResize = require("../middleware/imageResize.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const upload = multer({ dest: "uploads/" });

const bucketListRouter = express.Router();

// get bucket list items route
bucketListRouter.route("/:coupleId").get(getAllBucketListItemsByCoupleId);

// create new bucket list item route
bucketListRouter.route("/new").post(createBucketListItem);

// update bucket list item route
bucketListRouter
  .route("/:itemId")
  .put([upload.single("image")], updateBucketListItemById);

// get image from bucketListItem route
bucketListRouter.route("/:itemId/image").get(getImage);

// delete bucketListItem route
bucketListRouter.route("/:itemId").delete(deleteBucketListItemById);

module.exports = bucketListRouter;
