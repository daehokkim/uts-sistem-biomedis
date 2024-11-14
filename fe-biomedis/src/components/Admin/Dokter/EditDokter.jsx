import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDokterById, updateDokter } from '../api/dokterApi';

const EditDokter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    specialty: '',
    telepon: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDokterById(id);
      setFormData(response.data);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDokter(id, formData);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nama</label>
      <input name="nama" value={formData.nama} onChange={handleChange} />

      <label>specialty</label>
      <input name="specialty" value={formData.specialty} onChange={handleChange} />

      <label>Telepon</label>
      <input name="telepon" value={formData.telepon} onChange={handleChange} />

      <button type="submit">Update</button>
    </form>
  );
};

export default EditDokter;
