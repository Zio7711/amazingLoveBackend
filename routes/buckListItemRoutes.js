import {
  createBucketListITem,
  getAllBucketListItemsByCoupleId,
} from '../controller/bucketListItemController.js';

import express from 'express';

const bucketListItemRouter = express.Router();

bucketListItemRouter.route('/:coupleId').get(getAllBucketListItemsByCoupleId);
bucketListItemRouter.route('/new').post(createBucketListITem);
// bucketListItemRouter.route('/:id').delete(deleteMessage);

export default bucketListItemRouter;
