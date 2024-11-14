import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllDokters, deleteDokter } from '../api/dokterApi';

const DokterList = () => {
  const [dokters, setDokters] = useState([]);

  useEffect(() => {
    fetchDokters();
  }, []);

  const fetchDokters = async () => {
    const response = await getAllDokters();
    setDokters(response.data);
  };

  const handleDelete = async (id) => {
    await deleteDokter(id);
    fetchDokters();
  };

  return (
    <div>
      <h2>Daftar Dokter</h2>
      <Link to="/add">Tambah Dokter</Link>
      <ul>
        {dokters.map((dokter) => (
          <li key={dokter.id}>
            {dokter.nama} - {dokter.specialty}
            <Link to={`/edit/${dokter.id}`}>Edit</Link>
            <button onClick={() => handleDelete(dokter.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DokterList;
