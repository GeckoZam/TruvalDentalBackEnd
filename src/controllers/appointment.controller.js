const db = require("../models")
const Appointment = db.appointment
const Op = db.Sequelize.Op

exports.createAppointment = (req, res) => {
    // validate petition
    if (!req.body.appointmentDate) {
        res.status(400).send({
            message: "The content cannot be empty"
        });
        return;
    }

    // create appointment
    const appointment = {
        idPatient: req.body.idPatient,
        appointmentDate: req.body.appointmentDate,
        idTreatment: req.body.idTreatment,
        idUser: req.body.idUser
    };

    // save patient in the database
    Appointment.create(appointment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while creating an appointment."
            });
        });
}

exports.findAllAppointments = (req, res) => {
    const idAppointment = req.query.idAppointment;
    var condition = idAppointment ? { idAppointment: { [Op.like]: `%${idAppointment}%` } } : null;

    Appointment.findAll({ where: condition })
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

exports.findOneAppointmentById = (req, res) => {
    const idAppointment = req.params.idAppointment;

    Appointment.findByPk(idAppointment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving the appointment."
            });
        });

}
exports.findAppointmentsByPatientId = (req, res) => {
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

exports.findAppointmentsByDoctorId = (req, res) => {
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

exports.findAppointmentsByDate = (req, res) => {
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

exports.findAppointmentsByDateRange = (req, res) => {
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

exports.updateAppointment = (req, res) => {
    const idAppointment = req.params.idAppointment;

    Appointment.update(req.body, {
        where: { idAppointment: idAppointment }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Appointment was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update appointment with id=${idAppointment}. Maybe appointment was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating appointment with id=" + idAppointment
            });
        })
}

exports.deleteAppointment = (req, res) => {
    const idAppointment = req.params.idAppointment;

    Appointment.destroy({
        where: { idAppointment: idAppointment }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Appointment was deleted successfully."
                })
            } else {
                res.send({
                    message: `Cannot delete appointment with id=${idAppointment}. Maybe appointment was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting appointment with id=" + idAppointment
            });
        })
}