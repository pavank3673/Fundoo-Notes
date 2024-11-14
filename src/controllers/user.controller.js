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
