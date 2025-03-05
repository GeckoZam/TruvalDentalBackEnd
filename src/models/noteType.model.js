import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Note } from "./note.model.js";


export const NoteType = sequelize.define("noteType",{
    idNoteType:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    noteType:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING
    }
})

NoteType.hasMany(Note, {
    foreignKey: "idNoteType",
    sourceKey: 'idNoteType',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Note.belongsTo(NoteType, {
    foreignKey: "idNoteType",
    targetKey: 'idNoteType'
});