import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPasien = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    tanggal_lahir: new Date().toLocaleDateString("en-CA"), // format YYYY-MM-DD
    jenis_kelamin: "",
    tinggi_badan: "",
    berat_badan: "",
    alamat: "",
    telepon: "",
    riwayat_medis: "", // Tambahkan state untuk riwayat medis
    golongan_darah: "", // Tambahkan state untuk golongan darah
  });

  const [error, setError] = useState(""); // To handle error messages
  const [loading, setLoading] = useState(false); // To manage loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message on submit

    try {
      // Log form data to ensure it's correct
      console.log("Submitting form data:", formData);

      // Send data to the API
      const response = await axios.post(
        "http://localhost:5000/pasien",
        formData
      );

      // Handle success
      if (response.status === 201) {
        console.log("Pasien added:", response);
        navigate("/"); // Redirect to home if successful
      } else {
        setError("Failed to add pasien, please try again.");
        console.error("Failed to add pasien:", response);
      }
    } catch (error) {
      setError("Error while submitting form. Please try again.");
      console.error("Error while submitting form:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Tambah Pasien</h2>
      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}{" "}
      {/* Show error message if any */}
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="mb-4">
          <label
            htmlFor="nama"
            className="block text-sm font-medium text-gray-700"
          >
            Nama
          </label>
          <input
            type="text"
            name="nama"
            id="nama"
            placeholder="Nama"
            value={formData.nama}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="tanggal_lahir"
            className="block text-sm font-medium text-gray-700"
          >
            Tanggal Lahir
          </label>
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
          <label
            htmlFor="jenis_kelamin"
            className="block text-sm font-medium text-gray-700"
          >
            Jenis Kelamin
          </label>
          <select
            name="jenis_kelamin"
            id="jenis_kelamin"
            value={formData.jenis_kelamin}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="tinggi_badan"
            className="block text-sm font-medium text-gray-700"
          >
            Tinggi Badan (cm)
          </label>
          <input
            type="number"
            name="tinggi_badan"
            id="tinggi_badan"
            placeholder="Tinggi Badan"
            value={formData.tinggi_badan}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="berat_badan"
            className="block text-sm font-medium text-gray-700"
          >
            Berat Badan (kg)
          </label>
          <input
            type="number"
            name="berat_badan"
            id="berat_badan"
            placeholder="Berat Badan"
            value={formData.berat_badan}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="alamat"
            className="block text-sm font-medium text-gray-700"
          >
            Alamat
          </label>
          <input
            type="text"
            name="alamat"
            id="alamat"
            placeholder="Alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="telepon"
            className="block text-sm font-medium text-gray-700"
          >
            No Telepon
          </label>
          <input
            type="text"
            name="telepon"
            id="telepon"
            placeholder="No Telepon"
            value={formData.telepon}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* New fields for riwayat medis and golongan darah */}
        <div className="mb-4">
          <label
            htmlFor="riwayat_medis"
            className="block text-sm font-medium text-gray-700"
          >
            Riwayat Medis
          </label>
          <textarea
            name="riwayat_medis"
            id="riwayat_medis"
            placeholder="Riwayat Medis"
            value={formData.riwayat_medis}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="golongan_darah"
            className="block text-sm font-medium text-gray-700"
          >
            Golongan Darah
          </label>
          <select
            name="golongan_darah"
            id="golongan_darah"
            value={formData.golongan_darah}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Pilih Golongan Darah</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            disabled={loading} // Disable button while submitting
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPasien;
