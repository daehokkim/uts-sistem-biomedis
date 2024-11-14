import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-pink-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-semibold">
          <a href="/">Rekam Medis</a>
        </div>
        <div>
          <Link
            to="/admin-rekammedis" // Sesuaikan dengan path untuk login
            className="bg-pink-400 text-white py-2 px-4 rounded hover:bg-pink-500"
          >
            Tambah Rekam Medis
          </Link>
        </div>
        <div>
          <Link
            to="/admin-dokter" // Sesuaikan dengan path untuk login
            className="bg-pink-400 text-white py-2 px-4 rounded hover:bg-pink-500"
          >
            Tambah Dokter
          </Link>
        </div>
        <div>
          <Link
            to="/admin-pasien" // Sesuaikan dengan path untuk login
            className="bg-pink-400 text-white py-2 px-4 rounded hover:bg-pink-500"
          >
            Tambah Pasien
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
