import { Patient } from "../models/patient.model.js";

export const createPatient = async (req, res) => {
    try {
        // validate petition
        if (!req.body.name || !req.body.lastName || !req.body.surName || !req.body.phone || !req.body.birthDate) {
            res.status(400).json({
                message: "The content cannot be empty"
            });
            return;
        }

        // create patient
        const patient = {
            name: req.body.name,
            lastName: req.body.lastName,
            surName: req.body.surName,
            sex: req.body.sex,
            phone: req.body.phone,
            birthDate: req.body.birthDate
        };

        // save patient in the database
        await Patient.create(patient)
        
        res.status(200).json({
            message: "Patient was created successfully."
        })

    } catch (error) {
        res.status(500).json({
            message: "Error while creating the patient"
        })
    }
}

export const findAllPatients = async (req, res) => {
    try {
        const name = req.query.name;
        var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    
        const patient = await Patient.findAll({ where: condition })
        
        res.status(200).json(patient)

    } catch (error) {
        res.status(500).json({
            message: "An error ocurred while retrieving the patients."
        })
    }
}

export const findOnePatientById = async (req, res) => {

}

export const updatePatient = async (req, res) => {
    try {

        const { idPatient } = req.params;
        const { name, lastName, surName, sex, phone, birthDate } = req.body;

        const patient = await Patient.findByPk(idPatient);

        if (!patient) {

            res.status(404).json({ 
                message: "Patient not found" 
            });
            return;

        } else {

            patient.name = name
            patient.lastName = lastName
            patient.surName = surName
            patient.sex = sex
            patient.phone = phone
            patient.birthDate = birthDate

            await patient.save()

            res.status(200).json(patient);
        }

    } catch (error) {
        res.status(500).json({ 
            message: "Error finding the patient" 
        });
    }
}

export const deletePatient = async (req, res) => {
    try {
        const {idPatient} = req.params;

        await Patient.destroy({
            where: {
                idPatient: idPatient
            }
        })

        res.status(204).json({
            message: "Patient deleted successfully."
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while deleting the Patient."
        })
    }
}