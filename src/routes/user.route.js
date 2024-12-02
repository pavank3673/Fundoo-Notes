import express from 'express';
import * as userController from '../controllers/user.controller';
import {
  registerUserValidator,
  loginUserValidator,
  forgotPasswordUserValidator,
  resetPasswordUserValidator
} from '../validators/user.validator';
import { userAuthResetPassword } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', registerUserValidator, userController.registerUser);

router.post('/login', loginUserValidator, userController.loginUser);

router.get('/forgot-password', forgotPasswordUserValidator, userController.forgotPasswordUser);

router.patch('/reset-password', resetPasswordUserValidator, userAuthResetPassword, userController.resetPasswordUser);

export default router;
