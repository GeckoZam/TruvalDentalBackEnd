import app from './app.js';
import { sequelize } from './src/database/database.js';

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        //await sequelize.sync();
        //console.log('All models were synchronized successfully.');
        app.listen(5173, () => {
            console.log('Server is running on port 5173');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();