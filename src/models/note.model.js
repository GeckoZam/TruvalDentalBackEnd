module.exports = (sequelize, Sequelize) => {
    const Note = sequelize.define("note", {
        idNote: {
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
        idType: {
            type: Sequelize.INTEGER,
            references: {
                model: "NoteType",
                key: "idType"
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        },
        description: {
            type: Sequelize.STRING
        }
    });
    
    return Note;
}