const {
  createBucketListItem,
  getAllBucketListItemsByCoupleId,
  updateBucketListItemById,
  getImage,
} = require("../controller/bucketListItemController.js");

const express = require("express");
const imageResize = require("../middleware/imageResize.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const upload = multer({ dest: "uploads/" });

const bucketListRouter = express.Router();

bucketListRouter.route("/:coupleId").get(getAllBucketListItemsByCoupleId);
bucketListRouter.route("/new").post(createBucketListItem);

bucketListRouter
  .route("/:itemId")
  .put([upload.single("image")], updateBucketListItemById);

bucketListRouter.route("/:itemId/image").get(getImage);
module.exports = bucketListRouter;
