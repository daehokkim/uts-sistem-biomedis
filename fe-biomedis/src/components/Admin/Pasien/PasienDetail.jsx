import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PasienDetail = () => {
  const [pasien, setPasien] = useState([]);

  useEffect(() => {
    const fetchPasien = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pasien");
        setPasien(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPasien();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/pasien/${id}`);
      setPasien(pasien.filter((pas) => pas.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Daftar Pasien</h2>
      <div className="mb-4">
        <Link
          to="/add-pasien"
          className="inline-block py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          Tambah Pasien
        </Link>
      </div>
      <ul className="space-y-4">
        {pasien.map((pas) => (
          <li
            key={pas.id}
            className="flex justify-between items-center p-4 border border-gray-300 rounded-lg"
          >
            <div>
              <p className="font-medium text-lg">{pas.nama}</p>
            </div>
            <div className="flex space-x-4">
              <Link
                to={`/edit-pasien/${pas.id}`}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(pas.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasienDetail;
