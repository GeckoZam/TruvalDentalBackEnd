import { Router } from 'express';
import { 
    createNoteType,
    findAllNoteTypes,
    findOneNoteTypeById,
    updateNoteType,
    deleteNoteType
} from '../controllers/noteType.controller.js';

const router = Router()

router.post('/notetype', createNoteType)
router.get('/notetype', findAllNoteTypes)
router.get('/notetype/:idNoteType', findOneNoteTypeById)
router.put('/notetype/:idNoteType', updateNoteType)
router.delete('/notetype/:idNoteType', deleteNoteType)

export default router;