import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

sequelize.define("patient", {
    idPatient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
});