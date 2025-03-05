const express = require('express')
const appointmentController = require('../controllers/appointment.controller')

const router = express.Router()

router.route('/').post(appointmentController.createAppointment)
router.route('/').get(appointmentController.findAllAppointments)
router.route('/').get(appointmentController.findOneAppointmentById)
router.route('/').get(appointmentController.findAppointmentsByPatientId)
router.route('/').get(appointmentController.findAppointmentsByDoctorId)
router.route('/').get(appointmentController.findAppointmentsByDate)
router.route('/').get(appointmentController.findAppointmentsByDateRange)
router.route('/').put(appointmentController.updateAppointment)
router.route('/').delete(appointmentController.deleteAppointment)

module.exports = router ;