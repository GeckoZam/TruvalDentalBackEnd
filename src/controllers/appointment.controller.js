import { Appointment } from "../models/appointment.model.js";

export const createAppointment = async (req, res) => {
    try {
        // validate petition
        if (!req.body.appointmentDate || !req.body.idPatient || !req.body.idTreatment || !req.body.idUser) {
            res.status(400).json({
                message: "The content cannot be empty"
            });
            return;
        }

        // create appointment
        const appointment = {
            appointmentDate: req.body.appointmentDate,
            idPatient: req.body.idPatient,
            idTreatment: req.body.idTreatment,
            idUser: req.body.idUser
        };

        // save appointment in the database
        await Appointment.create(appointment)

        res.status(200).json({
            message: "Appointment created successfully."
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while creating the appointment."
        })
    }
}

export const findAllAppointments = async (req, res) => {
    try {
        const { idAppointment } = req.query;
        var condition = idAppointment ? { idAppointment: { [Op.like]: `%${idAppointment}%` } } : null;

        Appointment.findAll({
            where: condition
        })

        res.status(200).json({
            message: "Appointments retrieved successfully."
        })
    } catch (error) {
        res.status(500).json({
            message: "Error finding the appointments."
        })
    }
}

export const findOneAppointmentById = async (req, res) => {

}
export const findAppointmentsByPatientId = async (req, res) => {
    const idPatient = req.params.idPatient;

    Appointment.findAll({ where: { idPatient: idPatient } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving appointments."
            });
        });
}

export const findAppointmentsByDoctorId = async (req, res) => {
    const idUser = req.params.idUser;

    Appointment.findAll({ where: { idUser: idUser } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving appointments."
            });
        });
}

export const findAppointmentsByDate = async (req, res) => {
    const appointmentDate = req.params.appointmentDate;

    Appointment.findAll({ where: { appointmentDate: appointmentDate } })
        .then(data => {
            res.send(data);
        })
        .cathc(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving appointments."
            });
        });
}

export const findAppointmentsByDateRange = async (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    Appointment.findAll({ where: { appointmentDate: { [Op.between]: [startDate, endDate] } } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving appointments."
            });
        });
}

export const updateAppointment = async (req, res) => {
    try {
        const { idAppointment } = req.params;
        const { appointmentDate, idPatient, idTreatment, idUser } = req.body;

        const appointment = await Appointment.findByPk(idAppointment)

        if (!appointment) {
            res.status(404).json({
                message: "Appointment couldn't be found."
            })
        } else {
            appointment.appointmentDate = appointmentDate
            appointment.idPatient = idPatient
            appointment.idTreatment = idTreatment
            appointment.idUser = idUser

            await appointment.save()

            res.status(200).json({
                message: "Appointment updated successfully."
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Error while updating the appointment"
        })
    }
}

export const deleteAppointment = async (req, res) => {
    try {
        const { idAppointment } = req.params;
        await Appointment.destroy({
            where: {
                idAppointment: idAppointment
            }
        })
        res.status(204).json({
            message: "Appointment deleted successfully."
        })
    } catch (error) {
        res.status(500).json({ 
            message: "Error while deleting the appointment."
        })
    }
}