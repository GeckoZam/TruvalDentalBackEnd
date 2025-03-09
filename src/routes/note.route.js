import { Router } from "express";

import { 
    createNote,
    findAllNotes,
    findOneNoteById,
    findNotesByPatientId,
    findNotesByNoteTypeId,
    updateNote,
    deleteNote
} from '../controllers/note.controller.js';

const router = Router()

router.post('/notes', createNote)
router.get('/notes', findAllNotes)
router.get('/notes/:idNote', findOneNoteById)
router.get('/notes/:idPatient', findNotesByPatientId)
router.get('/notes/:idNoteType', findNotesByNoteTypeId)
router.put('/notes/:idNote', updateNote)
router.delete('/notes/:idNote', deleteNote)

export default router;