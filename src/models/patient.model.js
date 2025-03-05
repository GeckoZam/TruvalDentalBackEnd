import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Appointment } from "./appointment.model.js";
import { Note } from "./note.model.js";

export const Patient = sequelize.define("patient", {
    idPatient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
});

Patient.hasMany(Appointment, { 
    foreignKey: "idPatient",    
    sourceKey: 'idPatient',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Appointment.belongsTo(Patient, {
    foreignKey: "idPatient",
    targetKey: 'idPatient'
});

Patient.hasMany(Note, {
    foreignKey: "idPatient",
    sourceKey: 'idPatient',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Note.belongsTo(Patient, {
    foreignKey: "idPatient",
    targetKey: 'idPatient'
});