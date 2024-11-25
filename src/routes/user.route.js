import express from 'express';
import * as userController from '../controllers/user.controller';
import {
  registerUserValidator,
  loginUserValidator,
  forgotPasswordUserValidator
} from '../validators/user.validator';

const router = express.Router();

router.post('/', registerUserValidator, userController.registerUser);

router.get('/login', loginUserValidator, userController.loginUser);

router.get(
  '/forgot-password',
  forgotPasswordUserValidator,
  userController.forgotPasswordUser
);

export default router;
