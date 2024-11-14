import sequelize from '../config/Database.js'; 
import { DataTypes } from 'sequelize';
import PasienModels from './PasienModels.js';
import DokterModels from './DokterModels.js';

const RekamMedisModels = sequelize.define('rekam_medis', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_pasien: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_dokter: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tanggal_kunjungan: {
    type: DataTypes.DATE,
    allowNull: false
  },
  diagnosis: {
    type: DataTypes.STRING,
    allowNull: false
  },
  terapi: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resep_obat: {
    type: DataTypes.STRING,
    allowNull: true
  },
  catatan: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
    freezeTableName: true  // Menghindari Sequelize mengubah nama tabel menjadi bentuk jamak
});

RekamMedisModels.belongsTo(PasienModels, { foreignKey: 'id_pasien', as: 'pasien' });
RekamMedisModels.belongsTo(DokterModels, { foreignKey: 'id_dokter', as: 'dokter' });

export default RekamMedisModels;

(async()=>{
    await RekamMedisModels.sync();
})();