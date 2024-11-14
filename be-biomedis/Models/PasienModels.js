import sequelize from '../config/Database.js'; 
import { DataTypes } from 'sequelize';

const PasienModels = sequelize.define('pasien', {
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tanggal_lahir: {
        type: DataTypes.DATE,
        allowNull: false
    },
    jenis_kelamin: {
        type: DataTypes.ENUM('Laki-laki', 'Perempuan'),
        allowNull: false
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telepon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    riwayat_medis: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    golongan_darah: {
        type: DataTypes.ENUM('A', 'B', 'AB', 'O'),
        allowNull: true
    },
    tinggi_badan: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    berat_badan: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    freezeTableName: true  // Menghindari Sequelize mengubah nama tabel menjadi bentuk jamak
});

export default PasienModels;

(async () => {
    await PasienModels.sync();
})();
