import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import {
  newNoteValidator,
  updateNoteValidator
} from '../validators/note.validator';

const router = express.Router();

router.post('', newNoteValidator, userAuth, noteController.newNote);

router.get('', userAuth, noteController.getAllNotes);

router.get('/:id', userAuth, noteController.getNote);

router.put('/:id', userAuth, updateNoteValidator, noteController.updateNote);

router.delete('/:id', userAuth, noteController.deleteNote);

router.patch('/:id/isArchived', userAuth, noteController.toggleArchivedNote);

router.patch('/:id/isTrashed', userAuth, noteController.toggleTrashedNote);

export default router;
