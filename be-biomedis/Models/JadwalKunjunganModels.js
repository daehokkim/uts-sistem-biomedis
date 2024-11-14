import sequelize from '../config/Database.js'; 
import { DataTypes } from 'sequelize';

const JadwalKunjunganModels = sequelize.define('jadwal_kunjungan', {
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
  jam_kunjungan: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  freezeTableName: true  // Menghindari Sequelize mengubah nama tabel menjadi bentuk jamak
});

export default JadwalKunjunganModels;

(async()=>{
    await JadwalKunjunganModels.sync();
})();