import { useState, useEffect } from 'react';
import axios from 'axios';

// Fungsi untuk memformat tanggal
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID'); // Format tanggal sesuai dengan locale Indonesia
};

const PasienList = () => {
    const [pasien, setPasien] = useState([]);
    const [error, setError] = useState(''); // Untuk menangani error
    const [loading, setLoading] = useState(true); // Untuk menangani loading state

    useEffect(() => {
        const fetchPasien = async () => {
            try {
                const response = await axios.get('http://localhost:5000/pasien');
                setPasien(response.data); // Mengatur data pasien
                setLoading(false); // Set loading selesai
            } catch (error) {
                setError('Gagal memuat data pasien.'); // Menangani error jika gagal mengambil data
                setLoading(false); // Set loading selesai
                console.error(error);
            }
        };
        fetchPasien();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>; // Menampilkan loading sementara data diambil
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Data Pasien</h2>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Menampilkan error jika ada */}
            <ul className="space-y-4">
                {pasien.length > 0 ? (
                    pasien.map((pas) => (
                        <li key={pas.id} className="flex justify-between items-center p-4 border border-gray-300 rounded-lg">
                            <div>
                                <p className="font-medium text-lg">{pas.nama}</p>
                                <p className="text-gray-600">
                                    Tanggal Lahir : {formatDate(pas.tanggal_lahir)} , Jenis Kelamin : {pas.jenis_kelamin}
                                </p>
                                <p className="text-gray-600">
                                    Tinggi Badan : {pas.tinggi_badan} cm , Berat Badan : {pas.berat_badan} kg
                                </p>
                                <p className="text-gray-600">
                                    Golongan Darah : {pas.golongan_darah}
                                </p>
                                <p className="text-gray-600">
                                    Telepon : {pas.telepon}
                                </p>
                                <p className="text-gray-600">
                                    Alamat : {pas.alamat}
                                </p>
                                
                                <p className="text-gray-600">
                                    Riwayat Medis : {pas.riwayat_medis}
                                </p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-600">Tidak ada data pasien yang tersedia.</p>
                )}
            </ul>
        </div>
    );
};

export default PasienList;
