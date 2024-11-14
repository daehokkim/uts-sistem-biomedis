import DokterModels from "../Models/DokterModels.js";

// Mendapatkan semua data jadwal kunjungan dokter
export const getAllJadwalKunjungan = async (req, res) => {
    try {
        const jadwalKunjungan = await DokterModels.findAll();
        res.json(jadwalKunjungan);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving data", error: error.message });
    }
};

// Mendapatkan data jadwal kunjungan dokter berdasarkan ID
export const getJadwalKunjunganById = async (req, res) => {
    try {
        const jadwalKunjungan = await DokterModels.findByPk(req.params.id);
        if (jadwalKunjungan) {
            res.json(jadwalKunjungan);
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving data", error: error.message });
    }
};

// Menambahkan jadwal kunjungan dokter baru
export const createJadwalKunjungan = async (req, res) => {
    try {
        const newJadwalKunjungan = await DokterModels.create(req.body);
        res.status(201).json(newJadwalKunjungan);
    } catch (error) {
        res.status(400).json({ message: "Error creating data", error: error.message });
    }
};

// Memperbarui jadwal kunjungan dokter berdasarkan ID
export const updateJadwalKunjungan = async (req, res) => {
    try {
        const jadwalKunjungan = await DokterModels.findByPk(req.params.id);
        if (jadwalKunjungan) {
            await jadwalKunjungan.update(req.body);
            res.json({ message: "Data updated successfully" });
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error updating data", error: error.message });
    }
};

// Menghapus jadwal kunjungan dokter berdasarkan ID
export const deleteJadwalKunjungan = async (req, res) => {
    try {
        const jadwalKunjungan = await DokterModels.findByPk(req.params.id);
        if (jadwalKunjungan) {
            await jadwalKunjungan.destroy();
            res.json({ message: "Data deleted successfully" });
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting data", error: error.message });
    }
};
