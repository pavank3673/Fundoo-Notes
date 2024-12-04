import HttpStatus from 'http-status-codes';
import { createClient } from 'redis';

export const client = createClient(6379);

export const redisCache = async (req, res, next) => {
  const data = await client.get('noteList');
  if (data) {
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: JSON.parse(data),
      message: 'All cached notes fetched successfully'
    });
  } else {
    next();
  }
};
