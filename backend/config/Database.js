import { Sequelize } from "sequelize";

const db = new Sequelize('imajiwa', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;