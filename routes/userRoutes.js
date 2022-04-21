import express from 'express';
import { getUserById } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.route('/:id').get(getUserById);

export default userRouter;
