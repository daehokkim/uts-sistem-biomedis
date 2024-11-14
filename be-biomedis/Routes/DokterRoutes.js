import express from "express";
import {
    getAllJadwalKunjungan,
    getJadwalKunjunganById,
    createJadwalKunjungan,
    updateJadwalKunjungan,
    deleteJadwalKunjungan
} from "../controllers/DokterControllers.js";

const DokterRouter = express.Router();

DokterRouter.get("/dokter", getAllJadwalKunjungan);
DokterRouter.get("/dokter/:id", getJadwalKunjunganById);
DokterRouter.post("/dokter", createJadwalKunjungan);
DokterRouter.put("/dokter/:id", updateJadwalKunjungan);
DokterRouter.delete("/dokter/:id", deleteJadwalKunjungan);

export default DokterRouter;
