import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

export const newNote = async (req, res, next) => {
  try {
    const data = await NoteService.newNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      message: `${error}`
    });
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNotes(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All notes fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
