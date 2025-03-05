module.exports = (sequelize, Sequelize) => {
    const Treatment = sequelize.define("treatment", {
        idTreatment: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        treatmentType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
    });
    
    return Treatment;
}