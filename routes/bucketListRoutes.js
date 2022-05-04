import {
  createBucketListItem,
  getAllBucketListItemsByCoupleId,
  updateBucketListItemById,
} from '../controller/bucketListItemController.js';

import express from 'express';
import imageResize from '../middleware/imageResize.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const bucketListRouter = express.Router();

bucketListRouter.route('/:coupleId').get(getAllBucketListItemsByCoupleId);
bucketListRouter.route('/new').post(createBucketListItem);

bucketListRouter
  .route('/:itemId')
  .put([upload.single('image'), imageResize], updateBucketListItemById);

// bucketListRouter.route('/:id').delete(deleteMessage);

export default bucketListRouter;
