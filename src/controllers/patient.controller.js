const db = require("../models")
const Patient = db.patient
const Op = db.Sequelize.Op

exports.createPatient = (req, res) => {
    // validate petition
    if (!req.body.name && !req.body.lastName && !req.body.surName && !req.body.phone && !req.body.birthDate) {
        res.status(400).send({
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
    Patient.create(patient)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while creating the patient."
            });
        });
}

exports.findAllPatients = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Patient.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving patients."
            });
        });

}

exports.findOnePatientById = (req, res) => {
    const idPatient = req.params.idPatient;

    Patient.findByPk(idPatient)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving patient with id=" + idPatient
            });
        });
}

exports.updatePatient = (req, res) => {
    const idPatient = req.params.idPatient;

    Patient.update(req.body, {
        where: { idPatient: idPatient }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Patient was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Patient with id=${idPatient}. Maybe Patient was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Patient with id = " + idPatient
            });
        });
}

exports.deletePatient = (req, res) => {
    const idPatient = req.params.idPatient;

    Patient.destroy({
        where: { idPatient: idPatient }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Patient was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Patient with id=${idPatient}. Maybe Patient was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Patient with id=" + idPatient
            });
        });
}