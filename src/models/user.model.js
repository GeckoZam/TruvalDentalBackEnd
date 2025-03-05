import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Appointment } from "./appointment.model.js";

export const User = sequelize.define("user", {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.hasMany(Appointment, {
    foreignKey: "idUser",
    sourceKey: 'idUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Appointment.belongsTo(User, {
    foreignKey: "idUser",
    targetKey: 'idUser'
});