const express = require('express')
const treatmentController = require('../controllers/treatment.controller')

const router = express.Router()

router.route('/').post(treatmentController.createTreatment)
router.route('/').get(treatmentController.findAllTreatments)
router.route('/').get(treatmentController.findOneTreatmentById)
router.route('/').put(treatmentController.updateTreatment)
router.route('/').delete(treatmentController.deleteTreatment)

module.exports = router;