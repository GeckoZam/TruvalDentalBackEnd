import { NoteType } from "../models/noteType.model.js";

export const createNoteType = async (req, res) => {
    try {
        if (!req.body.noteType || !req.body.description) {
            res.status(400).json({
                message: "Content cannot be empty."
            })
            return;
        }

        const noteType = {
            noteType: req.body.noteType,
            description: req.body.description
        }

        await NoteType.save(noteType)

        res.status(200).json({
            message: "The note type was created successfully."
        })

    } catch (error) {
        res.status(500).json({
            message: "Error while creating the note type."
        })
    }
}

export const findAllNoteTypes = async (req, res) => {

}

export const findOneNoteTypeById = async (req, res) => {

}

export const updateNoteType = async (req, res) => {
    try {
        const { idNoteType } = req.params
        const { noteType, description } = req.body

        const type = await NoteType.findByPk(idNoteType);

        if (!type) {
            res.status(404).json({
                message: "Note type not found."
            })
            return;
        } else {
            type.noteType = noteType
            type.description = description

            await type.save()

            res.status(200).json({
                message: "Note type updated successfully."
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Error while updating the note type."
        })
    }
}

export const deleteNoteType = async (req, res) => {
    try {
        const { idNoteType } = req.params;

        await NoteType.destroy({
            where: {
                idNoteType: idNoteType
            }
        })

        res.status(204).json({
            message: "Note type deleted successfully."
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while deleting the note type."
        })
    }
}