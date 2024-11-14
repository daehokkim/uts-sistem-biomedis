import DokterModels from "../Models/DokterModels.js";
import PasienModels from "../Models/PasienModels.js";
import RekamMedisModels from "../Models/RekamMedisModels.js";

// Get all records
export const getAllRekamMedis = async (req, res) => {
    try {
        const rekamMedis = await RekamMedisModels.findAll({
            include: [
                {
                    model: PasienModels,
                    as: 'pasien',  // Asosiasi dengan alias 'pasien'
                    attributes: ['id', 'nama'],  // Memilih field yang diperlukan
                },
                {
                    model: DokterModels,
                    as: 'dokter',  // Asosiasi dengan alias 'dokter'
                    attributes: ['id', 'name'],  // Memilih field yang diperlukan
                }
            ]
        });
        res.json(rekamMedis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get record by ID
export const getRekamMedisById = async (req, res) => {
    try {
        const rekamMedis = await RekamMedisModels.findByPk(req.params.id, {
            include: [
                {
                    model: PasienModels,
                    as: 'pasien',  // Asosiasi dengan alias 'pasien'
                    attributes: ['id', 'nama'],  // Memilih field yang diperlukan
                },
                {
                    model: DokterModels,
                    as: 'dokter',  // Asosiasi dengan alias 'dokter'
                    attributes: ['id', 'name'],  // Memilih field yang diperlukan
                }
            ]
        });
        if (rekamMedis) {
            res.json(rekamMedis);
        } else {
            res.status(404).json({ message: "Record not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new record
export const createRekamMedis = async (req, res) => {
    try {
        const newRekamMedis = await RekamMedisModels.create(req.body);
        res.status(201).json(newRekamMedis);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing record
export const updateRekamMedis = async (req, res) => {
    try {
        const rekamMedis = await RekamMedisModels.findByPk(req.params.id);
        if (rekamMedis) {
            await rekamMedis.update(req.body);
            res.json(rekamMedis);
        } else {
            res.status(404).json({ message: "Record not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a record
export const deleteRekamMedis = async (req, res) => {
    try {
        const rekamMedis = await RekamMedisModels.findByPk(req.params.id);
        if (rekamMedis) {
            await rekamMedis.destroy();
            res.json({ message: "Record deleted" });
        } else {
            res.status(404).json({ message: "Record not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
