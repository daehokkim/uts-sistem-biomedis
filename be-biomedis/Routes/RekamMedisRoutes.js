import express from 'express';
import { 
    getAllRekamMedis, 
    getRekamMedisById, 
    createRekamMedis, 
    updateRekamMedis, 
    deleteRekamMedis 
} from '../controllers/RekamMedisControllers.js';

const RekamMedisRouter = express.Router();

RekamMedisRouter.get('/rekam_medis', getAllRekamMedis);
RekamMedisRouter.get('/rekam_medis/:id', getRekamMedisById);
RekamMedisRouter.post('/rekam_medis', createRekamMedis);
RekamMedisRouter.put('/rekam_medis/:id', updateRekamMedis);
RekamMedisRouter.delete('/rekam_medis/:id', deleteRekamMedis);

export default RekamMedisRouter;
