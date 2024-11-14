import express from "express";
import {
    getAllPasien,
    getPasienById,
    createPasien,
    updatePasien,
    deletePasien
} from "../controllers/PasienControllers.js";

const PasienRouter = express.Router();

// Route untuk pasien
PasienRouter.get("/pasien", getAllPasien);
PasienRouter.get("/pasien/:id", getPasienById);
PasienRouter.post("/pasien", createPasien);
PasienRouter.put("/pasien/:id", updatePasien);
PasienRouter.delete("/pasien/:id", deletePasien);

export default PasienRouter;
