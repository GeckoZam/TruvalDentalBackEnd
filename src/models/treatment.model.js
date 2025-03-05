import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Appointment } from "./appointment.model.js";

export const Treatment = sequelize.define("treatment", {
    idTreatment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    treatmentType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
})

Treatment.hasMany(Appointment, {
    foreignKey: "idTreatment",
    sourceKey: 'idTreatment',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Appointment.belongsTo(Treatment, {
    foreignKey: "idTreatment",
    targetKey: 'idTreatment'
});