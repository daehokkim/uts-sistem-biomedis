// DetailDokter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DokterDetail = () => {
    const [dokters, setDokters] = useState([]);

    useEffect(() => {
        fetchAllDokters();
    }, []);

    const fetchAllDokters = async () => {
        try {
            const response = await axios.get('http://localhost:5000/dokter');
            setDokters(response.data);
        } catch (error) {
            console.error('Error fetching dokters:', error);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            <h2 className="text-2xl font-semibold text-center mb-4">Daftar Dokter</h2>
            {dokters.map((dokter) => (
                <div key={dokter.id} className="p-4 mb-4 border border-gray-300 rounded">
                    <strong>Nama:</strong> {dokter.name} <br />
                    <strong>Spesialisasi:</strong> {dokter.specialty} <br />
                    <strong>Jadwal Kunjungan:</strong> {new Date(dokter.schedule).toLocaleDateString()} <br />
                </div>
            ))}
        </div>
    );
};

export default DokterDetail;
