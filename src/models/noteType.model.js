module.exports = (sequelize, Sequelize) => {
    const noteType = sequelize.define("noteType", {
        idType: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        noteType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
    });
    
    return noteType;
}