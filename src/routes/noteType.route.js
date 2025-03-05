const express = require('express')
const noteTypeController = require('../controllers/noteType.controller')

const router = express.Router()

router.route('/').post(noteTypeController.createNoteType)
router.route('/').get(noteTypeController.findAllNoteTypes)
router.route('/:id').get(noteTypeController.findOneNoteTypeById)
router.route('/:id').put(noteTypeController.updateNoteType)
router.route('/:id').delete(noteTypeController.deleteNoteType)

module.exports = router;