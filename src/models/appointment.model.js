module.exports = (sequelize, Sequelize) => {
    const Appointment = sequelize.define("appointment", {
        idAppointment: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idPatient: {
            type: Sequelize.INTEGER,
            references: {
                model: "Patient",
                key: "idPatient"
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        },
        appointmentDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        idTreatment: {
            type: Sequelize.INTEGER,
            references: {
                model: "Treatment",
                key: "idTreatment"
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        },
        idUser: {
            type: Sequelize.INTEGER,
            references: {
                model: "User",
                key: "idUser"
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        }
    });
    
    return Appointment;
}