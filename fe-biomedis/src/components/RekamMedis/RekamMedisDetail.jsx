import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const RekamMedisDetail = () => {
    const [rekamMedis, setRekamMedis] = useState([]); // Untuk menyimpan data rekam medis
    const [loading, setLoading] = useState(true); // Untuk menampilkan loading saat data sedang diambil

    // Mengambil data rekam medis dan pasien
    useEffect(() => {
        const fetchRekamMedis = async () => {
            try {
                // Mengambil data rekam medis
                const response = await axios.get('http://localhost:5000/rekam_medis');
                const rekamMedisData = response.data;
                console.log("Data Rekam Medis:", rekamMedisData); // Debugging untuk memeriksa data rekam medis

                // Menambahkan data pasien ke setiap rekam medis berdasarkan pasien_id
                const rekamMedisDenganPasien = await Promise.all(
                    rekamMedisData.map(async (rekam) => {
                        if (rekam.pasien_id) {
                            try {
                                const pasienResponse = await axios.get(`http://localhost:5000/pasien/${rekam.pasien_id}`);
                                console.log(`Data Pasien untuk Rekam ID ${rekam.id}:`, pasienResponse.data); // Debugging untuk memeriksa data pasien
                                rekam.pasien = pasienResponse.data;
                            } catch (error) {
                                console.error(`Error fetching pasien with ID ${rekam.pasien_id}:`, error);
                            }
                        }
                        return rekam;
                    })
                );

                setRekamMedis(rekamMedisDenganPasien); // Menyimpan data rekam medis beserta data pasien ke state
            } catch (error) {
                console.error('Error fetching rekam medis:', error);
            } finally {
                setLoading(false); // Menyembunyikan loading setelah data selesai diambil
            }
        };

        fetchRekamMedis();
    }, []);

    // Menampilkan loading ketika data masih dalam proses pengambilan
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Rekam Medis</h2>

            <ul>
                {rekamMedis.map((rekam) => (
                    <li key={rekam.id} className="mb-4 p-4 border border-gray-300 rounded">
                        <div>
                            <strong>Pasien:</strong> {rekam.pasien ? rekam.pasien.nama : 'Pasien Tidak Ditemukan'}
                        </div>
                        
                        <div>
                            <strong>Dokter:</strong> {rekam.dokter ? rekam.dokter.name : 'Dokter Tidak Ditemukan'}
                        </div>
                        <div>
                            <strong>Jadwal Kunjungan: </strong>
                            {rekam.dokter && rekam.tanggal_kunjungan ? (
                                format(new Date(rekam.tanggal_kunjungan), 'dd MMMM yyyy', { locale: id })
                            ) : (
                                'Jadwal Tidak Tersedia'
                            )}
                        </div>
                        <div>
                            <strong>Diagnosis:</strong> {rekam.diagnosis ? rekam.diagnosis : '-'}
                        </div>
                        <div>
                            <strong>Terapi:</strong> {rekam.terapi ? rekam.terapi : '-'}
                        </div>
                        <div>
                            <strong>Resep Obat:</strong> {rekam.resep_obat ? rekam.resep_obat : '-'}
                        </div>
                        <div>
                            <strong>Catatan:</strong> {rekam.catatan ? rekam.catatan : '-'}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RekamMedisDetail;
