const {
  createBucketListItem,
  getAllBucketListItemsByCoupleId,
  updateBucketListItemById,
} = require('../controller/bucketListItemController.js');

const express = require('express');
const imageResize = require('../middleware/imageResize.js');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const bucketListRouter = express.Router();

bucketListRouter.route('/:coupleId').get(getAllBucketListItemsByCoupleId);
bucketListRouter.route('/new').post(createBucketListItem);

bucketListRouter
  .route('/:itemId')
  .put([upload.single('image'), imageResize], updateBucketListItemById);

// bucketListRouter.route('/:id').delete(deleteMessage);

export default bucketListRouter;
