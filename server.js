import app from './app.js';
import { sequelize } from './src/database/database.js';
//import './src/models/user.model.js';
//import './src/models/patient.model.js';
//import './src/models/appointment.model.js';
//import './src/models/note.model.js';
//import './src/models/noteType.model.js';
//import './src/models/treatment.model.js';

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        //await sequelize.sync();
        //console.log('All models were synchronized successfully.');
        app.listen(8080, () => {
            console.log('Server is running on port 8080');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();