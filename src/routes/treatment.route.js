import { Router } from "express";

import { 
    createTreatment, 
    findAllTreatments, 
    findOneTreatmentById,
    updateTreatment,
    deleteTreatment
} from '../controllers/treatment.controller.js';

const router = Router()

router.post('/treatment', createTreatment)
router.get('/treatment', findAllTreatments)
router.get('/treatment/:idTreatment', findOneTreatmentById)
router.put('/treatment/:idTreatment', updateTreatment)
router.delete('/treatment/:idTreatment', deleteTreatment)

export default router;