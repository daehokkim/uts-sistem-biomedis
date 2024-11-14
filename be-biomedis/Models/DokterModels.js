import sequelize from '../config/Database.js'; 
import { DataTypes } from 'sequelize';

const DokterModels = sequelize.define('dokter', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialty: {
        type: DataTypes.STRING,
        allowNull: false
    },
    schedule: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true  // Menghindari Sequelize mengubah nama tabel menjadi bentuk jamak
});



export default DokterModels;

(async()=>{
    await DokterModels.sync();
})();