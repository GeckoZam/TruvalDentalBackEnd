import app from './app.js';
import { sequelize } from './src/database/database.js';

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(8080, () => {
            console.log('Server is running on port 8080');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();