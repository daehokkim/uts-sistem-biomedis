import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const RekamMedis = () => {
  const [rekamMedis, setRekamMedis] = useState([]);
  const [pasien, setPasien] = useState([]);
  const [dokter, setDokter] = useState([]);
  const [formData, setFormData] = useState({
    id_pasien: "",
    id_dokter: "",
    diagnosis: "",
    terapi: "",
    resep_obat: "",
    catatan: "",
    tanggal_kunjungan: "", // Akan diisi berdasarkan jadwal dokter yang dipilih
    alamat: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    telepon: "",
    riwayat_medis: "",
    golongan_darah: "",
    tinggi_badan: "",
    berat_badan: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mengambil data rekam medis, pasien, dan dokter
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchRekamMedis(), fetchPasien(), fetchDokter()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchRekamMedis = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rekam_medis");
      setRekamMedis(response.data);
    } catch (error) {
      console.error("Error fetching rekam medis:", error);
    }
  };

  const fetchPasien = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pasien");
      setPasien(response.data);
    } catch (error) {
      console.error("Error fetching pasien:", error);
    }
  };

  const fetchDokter = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dokter");
      setDokter(response.data);
    } catch (error) {
      console.error("Error fetching dokter:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDokterChange = (e) => {
    const { value } = e.target;
    const dokterTerpilih = dokter.find((d) => d.id === parseInt(value)); // Pastikan value adalah integer yang cocok
    if (dokterTerpilih) {
      setFormData((prev) => ({
        ...prev,
        id_dokter: dokterTerpilih.id, // Set id dokter
        tanggal_kunjungan: dokterTerpilih.schedule || "", // Set tanggal kunjungan berdasarkan jadwal dokter
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        id_dokter: "",
        tanggal_kunjungan: "", // Reset jika tidak ada dokter
      }));
    }
  };

  const handlePasienChange = (e) => {
    const { value } = e.target;
    const pasienTerpilih = pasien.find((p) => p.id === parseInt(value));
    if (pasienTerpilih) {
      setFormData((prev) => ({
        ...prev,
        id_pasien: pasienTerpilih.id, // Set id pasien
        alamat: pasienTerpilih.alamat || "",
        tanggal_lahir: pasienTerpilih.tanggal_lahir || "",
        jenis_kelamin: pasienTerpilih.jenis_kelamin || "",
        telepon: pasienTerpilih.telepon || "",
        riwayat_medis: pasienTerpilih.riwayat_medis || "",
        golongan_darah: pasienTerpilih.golongan_darah || "",
        tinggi_badan: pasienTerpilih.tinggi_badan || "",
        berat_badan: pasienTerpilih.berat_badan || "",
      }));
    }
  };

  const handleTanggalChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      tanggal_kunjungan: value,
    }));
  };

  const handleAddRekamMedis = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/rekam_medis", formData);
      fetchRekamMedis();
      resetFormData();
    } catch (error) {
      console.error("Error adding rekam medis:", error);
    }
  };

  const handleEditRekamMedis = (rekam) => {
    setEditingId(rekam.id);
    setFormData({
      id_pasien: rekam.id_pasien,
      id_dokter: rekam.id_dokter,
      diagnosis: rekam.diagnosis,
      terapi: rekam.terapi,
      resep_obat: rekam.resep_obat,
      catatan: rekam.catatan,
      tanggal_kunjungan: rekam.tanggal_kunjungan, // Menjaga agar tanggal tetap ada pada rekam medis yang sudah ada
    });
  };

  const handleUpdateRekamMedis = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/rekam_medis/${editingId}`,
        formData
      );
      fetchRekamMedis();
      setEditingId(null);
      resetFormData();
    } catch (error) {
      console.error("Error updating rekam medis:", error);
    }
  };

  const handleDeleteRekamMedis = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/rekam_medis/${id}`);
      fetchRekamMedis();
    } catch (error) {
      console.error("Error deleting rekam medis:", error);
    }
  };

  const resetFormData = () => {
    setFormData({
      id_pasien: "",
      id_dokter: "",
      diagnosis: "",
      terapi: "",
      resep_obat: "",
      catatan: "",
      tanggal_kunjungan: "",
      alamat: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      telepon: "",
      riwayat_medis: "",
      golongan_darah: "",
      tinggi_badan: "",
      berat_badan: "",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Rekam Medis</h2>

      <form
        onSubmit={editingId ? handleUpdateRekamMedis : handleAddRekamMedis}
        className="mb-6"
      >
        <select
          name="id_pasien"
          value={formData.id_pasien}
          onChange={handlePasienChange} // Perubahan di sini
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        >
          <option value="">Pilih Pasien</option>
          {pasien.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nama}
            </option>
          ))}
        </select>

        <select
          name="id_dokter"
          value={formData.id_dokter}
          onChange={handleDokterChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        >
          <option value="">Pilih Dokter</option>
          {dokter.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="tanggal_kunjungan"
          placeholder="Jadwal Kunjungan"
          value={formData.tanggal_kunjungan}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
          readOnly
        />

        <input
          type="text"
          name="diagnosis"
          placeholder="Diagnosis"
          value={formData.diagnosis}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="terapi"
          placeholder="Terapi"
          value={formData.terapi}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <textarea
          name="resep_obat"
          placeholder="Resep Obat"
          value={formData.resep_obat}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <textarea
          name="catatan"
          placeholder="Catatan"
          value={formData.catatan}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="bg-pink-500 text-white p-2 rounded mt-4"
        >
          {editingId ? "Update Rekam Medis" : "Tambah Rekam Medis"}
        </button>
      </form>

      <ul>
        {rekamMedis.map((rekam) => (
          <li
            key={rekam.id}
            className="mb-4 p-4 border border-gray-300 rounded"
          >
            <div>
              <strong>Pasien:</strong>{" "}
              {rekam.pasien ? rekam.pasien.nama : "Pasien Tidak Ditemukan"}
            </div>
            <div>
              <strong>Dokter:</strong>{" "}
              {rekam.dokter ? rekam.dokter.name : "Dokter Tidak Ditemukan"}
            </div>
            <div>
              <strong>Jadwal Kunjungan: </strong>
              {rekam.dokter && rekam.tanggal_kunjungan
                ? format(new Date(rekam.tanggal_kunjungan), "dd MMMM yyyy", {
                    locale: id,
                  })
                : "Jadwal Tidak Tersedia"}
            </div>

            <div>
              <strong>Diagnosis:</strong>{" "}
              {rekam.diagnosis ? rekam.diagnosis : "-"}
            </div>
            <div>
              <strong>Terapi:</strong> {rekam.terapi ? rekam.terapi : "-"}
            </div>
            <div>
              <strong>Resep Obat:</strong>{" "}
              {rekam.resep_obat ? rekam.resep_obat : "-"}
            </div>
            <div>
              <strong>Catatan:</strong> {rekam.catatan ? rekam.catatan : "-"}
            </div>
            <div>
              <button
                onClick={() => handleEditRekamMedis(rekam)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteRekamMedis(rekam.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RekamMedis;
