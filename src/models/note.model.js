import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Note = sequelize.define("note", {
    idNote: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})