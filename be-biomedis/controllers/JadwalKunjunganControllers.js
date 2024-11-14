import JadwalKunjunganModels from "../Models/JadwalKunjunganModels.js";

// Mengambil semua data jadwal kunjungan
export const getAllJadwalKunjungan = async (req, res) => {
    try {
        const jadwalKunjungan = await JadwalKunjunganModels.findAll();
        res.status(200).json(jadwalKunjungan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mengambil data jadwal kunjungan berdasarkan ID
export const getJadwalKunjunganById = async (req, res) => {
    try {
        const jadwalKunjungan = await JadwalKunjunganModels.findByPk(req.params.id);
        if (jadwalKunjungan) {
            res.status(200).json(jadwalKunjungan);
        } else {
            res.status(404).json({ message: "Jadwal kunjungan tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Menambahkan data jadwal kunjungan baru
export const createJadwalKunjungan = async (req, res) => {
    try {
        const { id_pasien, id_dokter, tanggal_kunjungan, jam_kunjungan } = req.body;
        const newJadwalKunjungan = await JadwalKunjungan.create({
            id_pasien,
            id_dokter,
            tanggal_kunjungan,
            jam_kunjungan
        });
        res.status(201).json(newJadwalKunjungan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mengupdate data jadwal kunjungan
export const updateJadwalKunjungan = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_pasien, id_dokter, tanggal_kunjungan, jam_kunjungan } = req.body;

        const jadwalKunjungan = await JadwalKunjunganModels.findByPk(id);
        if (jadwalKunjungan) {
            jadwalKunjungan.id_pasien = id_pasien;
            jadwalKunjungan.id_dokter = id_dokter;
            jadwalKunjungan.tanggal_kunjungan = tanggal_kunjungan;
            jadwalKunjungan.jam_kunjungan = jam_kunjungan;
            await jadwalKunjungan.save();
            res.status(200).json(jadwalKunjungan);
        } else {
            res.status(404).json({ message: "Jadwal kunjungan tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Menghapus data jadwal kunjungan
export const deleteJadwalKunjungan = async (req, res) => {
    try {
        const { id } = req.params;
        const jadwalKunjungan = await JadwalKunjunganModels.findByPk(id);
        if (jadwalKunjungan) {
            await jadwalKunjungan.destroy();
            res.status(200).json({ message: "Jadwal kunjungan berhasil dihapus" });
        } else {
            res.status(404).json({ message: "Jadwal kunjungan tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
