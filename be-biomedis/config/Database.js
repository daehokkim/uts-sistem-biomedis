import { Sequelize } from "sequelize";

const db = new Sequelize('uts_biomedis', 'root', '', {
    host: 'localhost',
    dialect: "mysql",
    logging: console.log
});

export default db;