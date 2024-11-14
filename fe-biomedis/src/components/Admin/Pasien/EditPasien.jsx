import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPasien = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    tinggi_badan: '',
    berat_badan: '',
    alamat: '',
    no_telepon: '',
  });

  useEffect(() => {
    const fetchPasien = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pasien/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPasien();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/pasien/${id}`, formData);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Pasien</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
          <input
            type="text"
            name="nama"
            id="nama"
            value={formData.nama}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
          <input
            type="date"
            name="tanggal_lahir"
            id="tanggal_lahir"
            value={formData.tanggal_lahir}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="jenis_kelamin" className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
          <input
            type="text"
            name="jenis_kelamin"
            id="jenis_kelamin"
            value={formData.jenis_kelamin}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tinggi_badan" className="block text-sm font-medium text-gray-700">Tinggi Badan (cm)</label>
          <input
            type="number"
            name="tinggi_badan"
            id="tinggi_badan"
            value={formData.tinggi_badan}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="berat_badan" className="block text-sm font-medium text-gray-700">Berat Badan (kg)</label>
          <input
            type="number"
            name="berat_badan"
            id="berat_badan"
            value={formData.berat_badan}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
          <input
            type="text"
            name="alamat"
            id="alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="no_telepon" className="block text-sm font-medium text-gray-700">No Telepon</label>
          <input
            type="text"
            name="no_telepon"
            id="no_telepon"
            value={formData.no_telepon}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPasien;
