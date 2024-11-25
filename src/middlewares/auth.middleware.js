import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const result = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);
    req.body.UserId = result.id;
    next();
  } catch (error) {
    res.status(HttpStatus.FORBIDDEN).json({
      code: HttpStatus.FORBIDDEN,
      message: 'Authorization token mismatch'
    });
  }
};

export const userAuthResetPassword = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const result = jwt.verify(
      bearerToken,
      process.env.ACCESS_TOKEN_FORGOT_PASSWORD
    );
    req.body.userId = result.id;
    console.log('req.body.userId' + req.body.userId);
    next();
  } catch (error) {
    res.status(HttpStatus.FORBIDDEN).json({
      code: HttpStatus.FORBIDDEN,
      message: 'Authorization token mismatch'
    });
  }
};
