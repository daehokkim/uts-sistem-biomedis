import React, { useState, useEffect } from "react";
import axios from "axios";

const AddDokter = () => {
  const [dokters, setDokters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    schedule: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDokters();
  }, []);

  const fetchDokters = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dokter");
      setDokters(response.data);
    } catch (error) {
      console.error("Error fetching dokter data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDokter = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/dokter", formData);
      fetchDokters();
      setFormData({ name: "", specialty: "", schedule: "" });
    } catch (error) {
      console.error("Error adding dokter:", error);
    }
  };

  const handleEditDokter = (dokter) => {
    setEditingId(dokter.id);
    setFormData({
      name: dokter.name,
      speciality: dokter.speciality,
      schedule: dokter.schedule ? dokter.schedule.split("T")[0] : "", // Format date tanpa waktu
    });
  };

  const handleUpdateDokter = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/dokter/${editingId}`, formData);
      fetchDokters();
      setEditingId(null);
      setFormData({ name: "", specialty: "", schedule: "" });
    } catch (error) {
      console.error("Error updating dokter:", error);
    }
  };

  const handleDeleteDokter = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/dokter/${id}`);
      fetchDokters();
    } catch (error) {
      console.error("Error deleting dokter:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Daftar Dokter</h2>

      <form
        onSubmit={editingId ? handleUpdateDokter : handleAddDokter}
        className="mb-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="specialty"
          placeholder="specialty"
          value={formData.specialty}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="schedule"
          placeholder="Jadwal Kunjungan"
          value={formData.schedule}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Dokter" : "Tambah Dokter"}
        </button>
      </form>

      <ul>
        {dokters.map((dokter) => (
          <li
            key={dokter.id}
            className="mb-4 p-4 border border-gray-300 rounded"
          >
            <div>
              <strong>Nama:</strong> {dokter.name} <br />
              <strong>Sepasialisasi:</strong> {dokter.specialty} <br />
              <strong>Jadwal Kunjungan:</strong>{" "}
              {new Date(dokter.schedule).toLocaleDateString()} <br />
            </div>
            <div className="mt-2">
              <button
                onClick={() => handleEditDokter(dokter)}
                className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteDokter(dokter.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
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

export default AddDokter;
