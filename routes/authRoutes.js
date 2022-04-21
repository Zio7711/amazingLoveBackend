import {
  autoLogin,
  login,
  register,
  updateUser,
} from '../controller/authController.js';

import authenticateUser from '../middleware/auth.js';
import express from 'express';

const authRouter = express.Router();
authRouter.route('/register').post(register);
authRouter.route('/login').post(login);
authRouter.route('/autoLogin').get(authenticateUser, autoLogin);
authRouter.route('/updateUser').patch(authenticateUser, updateUser);

export default authRouter;
