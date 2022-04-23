import { getCoupleById, getUserById } from '../controller/userController.js';

import express from 'express';

const userRouter = express.Router();

userRouter.route('/:id').get(getUserById);
userRouter.route('/couple/:id').get(getCoupleById);

export default userRouter;
