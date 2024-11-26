import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import {
  newNoteValidator,
  updateNoteValidator,
  noteByIdValidator
} from '../validators/note.validator';

const router = express.Router();

router.post('', newNoteValidator, userAuth, noteController.newNote);

router.get('', userAuth, noteController.getAllNotes);

router.get('/:id', noteByIdValidator, userAuth, noteController.getNote);

router.put('/:id', updateNoteValidator, userAuth, noteController.updateNote);

router.delete('/:id', noteByIdValidator, userAuth, noteController.deleteNote);

router.patch(
  '/:id/isArchived',
  noteByIdValidator,
  userAuth,
  noteController.toggleArchivedNote
);

router.patch(
  '/:id/isTrashed',
  noteByIdValidator,
  userAuth,
  noteController.toggleTrashedNote
);

export default router;
