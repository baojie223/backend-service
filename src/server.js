require('dotenv').config();
const app = require('./app');
const { sequelize, testConnection } = require('./config/db');

const PORT = process.env.PORT || 3000;

(async () => {
    await testConnection();

    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})()