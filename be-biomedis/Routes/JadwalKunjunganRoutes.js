import express from "express";
import { createJadwalKunjungan, deleteJadwalKunjungan, getAllJadwalKunjungan, getJadwalKunjunganById, updateJadwalKunjungan } from "../controllers/JadwalKunjunganControllers.js";

const JadwalKunjunganRouter = express.Router();

JadwalKunjunganRouter.get("/jadwal_kunjungan", getAllJadwalKunjungan);
JadwalKunjunganRouter.get("/jadwal_kunjungan/:id", getJadwalKunjunganById);
JadwalKunjunganRouter.post("/jadwal_kunjungan", createJadwalKunjungan);
JadwalKunjunganRouter.put("/jadwal_kunjungan/:id", updateJadwalKunjungan);
JadwalKunjunganRouter.delete("/jadwal_kunjungan/:id", deleteJadwalKunjungan);

export default JadwalKunjunganRouter;
