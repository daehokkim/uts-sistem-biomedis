// Import express
import express from 'express';
import cors from 'cors';
import JadwalKunjunganRouter from './Routes/JadwalKunjunganRoutes.js';
import RekamMedisRouter from './Routes/RekamMedisRoutes.js';
import DokterRouter from './Routes/DokterRoutes.js';
import PasienRouter from './Routes/PasienRoutes.js';
// Membuat aplikasi Express
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors({
  origin: 'http://localhost:5173', // Hanya izinkan permintaan dari frontend yang berjalan di localhost:5173
}));


app.use(JadwalKunjunganRouter);
app.use(RekamMedisRouter);
app.use(DokterRouter);
app.use(PasienRouter);
app.put('/pasien/:id', async (req, res) => {
  const { id } = req.params;
  const { nama, tanggal_lahir, jenis_kelamin, tinggi_badan, berat_badan, alamat, no_telepon } = req.body;
  
  try {
    const pasien = await Pasien.findById(id);
    if (!pasien) return res.status(404).send('Pasien tidak ditemukan');

    // Update hanya field yang diisi
    if (nama) pasien.nama = nama;
    if (tanggal_lahir) pasien.tanggal_lahir = tanggal_lahir;
    if (jenis_kelamin) pasien.jenis_kelamin = jenis_kelamin;
    if (tinggi_badan) pasien.tinggi_badan = tinggi_badan;
    if (berat_badan) pasien.berat_badan = berat_badan;
    if (alamat) pasien.alamat = alamat;
    if (no_telepon) pasien.no_telepon = no_telepon;

    await pasien.save();
    res.send('Pasien berhasil diperbarui');
  } catch (error) {
    res.status(400).send(error);
  }
});


// Menjalankan server pada port 5000
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
