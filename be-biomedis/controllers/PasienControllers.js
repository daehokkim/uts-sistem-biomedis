import PasienModels from "../Models/PasienModels.js";

// Mendapatkan semua data pasien
export const getAllPasien = async (req, res) => {
    try {
        const pasien = await PasienModels.findAll();
        res.json(pasien);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving data", error: error.message });
    }
};

// Mendapatkan data pasien berdasarkan ID
export const getPasienById = async (req, res) => {
    try {
        const pasien = await PasienModels.findByPk(req.params.id);
        if (pasien) {
            res.json(pasien);
        } else {
            res.status(404).json({ message: "Data pasien tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving data", error: error.message });
    }
};

// Menambahkan pasien baru
export const createPasien = async (req, res) => {
    try {
        const { nama, tanggal_lahir, jenis_kelamin, alamat, telepon, riwayat_medis, golongan_darah, tinggi_badan, berat_badan } = req.body;
        const newPasien = await PasienModels.create({
            nama,
            tanggal_lahir,
            jenis_kelamin,
            alamat,
            telepon,
            riwayat_medis,
            golongan_darah,
            tinggi_badan,
            berat_badan
        });
        res.status(201).json(newPasien);
    } catch (error) {
        res.status(400).json({ message: "Error creating data pasien", error: error.message });
    }
};

// Memperbarui data pasien berdasarkan ID
export const updatePasien = async (req, res) => {
    try {
        const pasien = await PasienModels.findByPk(req.params.id);
        if (pasien) {
            await pasien.update(req.body);
            res.json({ message: "Data pasien berhasil diperbarui" });
        } else {
            res.status(404).json({ message: "Data pasien tidak ditemukan" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error updating data pasien", error: error.message });
    }
};

// Menghapus data pasien berdasarkan ID
export const deletePasien = async (req, res) => {
    try {
        const pasien = await PasienModels.findByPk(req.params.id);
        if (pasien) {
            await pasien.destroy();
            res.json({ message: "Data pasien berhasil dihapus" });
        } else {
            res.status(404).json({ message: "Data pasien tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting data pasien", error: error.message });
    }
};
