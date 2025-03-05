const express = require('express')
const patientController = require('../controllers/patient.controller')

const router = express.Router()

router.route('/').post(patientController.createPatient)
router.route('/').get(patientController.findAllPatients)
router.route('/:id').get(patientController.findOnePatientById)
router.route('/:id').put(patientController.updatePatient)
router.route('/:id').delete(patientController.deletePatient)

module.exports = router;