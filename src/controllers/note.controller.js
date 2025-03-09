import { Note } from "../models/note.model.js";

export const createNote = async (req, res) => {
    try {
        if (!req.body.title || !req.body.description) {
            res.status(400).json({
                message: "The content cannot be empty"
            })
            return;
        }

        const note = {
            title: req.body.title,
            description: req.body.description,
            idNoteType: req.body.idNoteType
        }

        await Note.create(note)

        res.status(200).json({
            message: "The note was created successfully."
        })

    } catch (error) {
        res.status(500).json({
            message: "Error while creating the Note."
        })
    }
}

export const findAllNotes = async (req, res) => {

}

export const findOneNoteById = async (req, res) => {

}

export const findNotesByPatientId = async (req, res) => {

}

export const findNotesByNoteTypeId = async (req, res) => {

}

export const updateNote = async (req, res) => {
    try {
        const { idNote } = req.params;
        const { title, description } = req.body;

        const note = await Note.findByPk(idNote)

        if (!note) {
            res.status(404).json({
                message: "Note not found"
            })
        } else {
            note.title = title
            note.description = description

            await note.save()

            res.status(202).json({
                message: "Note updated successfully."
            })
        }
    } catch (error) {
        res.status(500).json({ 
            message: "Error finding the desired Note" 
        })
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { idNote } = req.params;

        await Note.destroy({
            where: {
                idNote: idNote
            }
        })

        res.status(204).json({
            message: "Note deleted successfully."
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while deleting the Note."
        })
    }
}