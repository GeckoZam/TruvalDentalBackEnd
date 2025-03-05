import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Appointment = sequelize.define("appointment", {
    idAppointment:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    appointmentDate:{
        type: DataTypes.DATE,
        allowNull: false
    }
})