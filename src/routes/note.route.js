const express = require('express')
const noteController = require('../controllers/note.controller')

const router = express.Router()

router.route('/').post(noteController.createNote)
router.route('/').get(noteController.findAllNotes)
router.route('/:id').get(noteController.findOneNoteById)
router.route('/:id').get(noteController.findNotesByPatientId)
router.route('/:id').get(noteController.findNotesByDoctorId)
router.route('/:id').put(noteController.updateNote)
router.route('/:id').delete(noteController.deleteNote)

module.exports = router;