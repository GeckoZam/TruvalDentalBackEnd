import { Router } from "express";

import { 
    createAppointment, 
    findAllAppointments, 
    findOneAppointmentById, 
    findAppointmentsByPatientId, 
    findAppointmentsByDoctorId, 
    findAppointmentsByDate, 
    findAppointmentsByDateRange, 
    updateAppointment, 
    deleteAppointment 
} from '../controllers/appointment.controller.js';

const router = Router()

router.post('/appointments', createAppointment)
router.get('/appointments', findAllAppointments)
router.get('/appointments/:idAppointment', findOneAppointmentById)
router.get('/appointments/:idPatient', findAppointmentsByPatientId)
router.get('/appointments/:idUser', findAppointmentsByDoctorId)
router.get('/appointments', findAppointmentsByDate)
router.get('/appointments', findAppointmentsByDateRange)
router.put('appointments/:idAppointment/', updateAppointment)
router.delete('/appointments/:idAppointment', deleteAppointment)

export default router;