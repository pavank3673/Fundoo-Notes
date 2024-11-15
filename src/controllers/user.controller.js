import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const data = await UserService.registerUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User registered successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const data = await UserService.getUserByEmail(req.body.email);
    let isEqual = false;
    if (data != null) {
      isEqual = await bcrypt.compare(req.body.password, data.password);
    }
    if (isEqual) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User logged in successfully'
      });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        data: [],
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    next(error);
  }
};
