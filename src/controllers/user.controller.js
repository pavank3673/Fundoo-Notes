import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import { sendMail } from '../utils/mailHelper.js';

export const registerUser = async (req, res, next) => {
  try {
    const data = await UserService.registerUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      message: `${error}`
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const token = await UserService.getUserByEmail(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: token,
      message: 'User logged in successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const forgotPasswordUser = async (req, res, next) => {
  try {
    const token = await UserService.forgotPasswordUser(req.body);
    const info = await sendMail(req.body.email, token);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      info: info,
      message: 'Mail sent successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
