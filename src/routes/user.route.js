import express from 'express';
import * as userController from '../controllers/user.controller';
import {
  registerUserValidator,
  loginUserValidator
} from '../validators/user.validator';
// import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', registerUserValidator, userController.registerUser);

router.get('/login', loginUserValidator, userController.loginUser);

export default router;
