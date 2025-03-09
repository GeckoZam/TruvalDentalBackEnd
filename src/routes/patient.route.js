import { Router } from "express";

import { 
    createPatient, 
    findAllPatients, 
    findOnePatientById,
    updatePatient,
    deletePatient
} from '../controllers/patient.controller.js';

const router = Router()

router.post('/patient', createPatient)
router.get('/patient', findAllPatients)
router.get('patient/:idPatient', findOnePatientById)
router.put('/patient/:idPatient', updatePatient)
router.delete('/patient/:idPatient', deletePatient)

export default router;