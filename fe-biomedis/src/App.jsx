import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import AddPasien from "./components/Admin/Pasien/AddPasien";
import EditPasien from "./components/Admin/Pasien/EditPasien";
import PasienAdmin from "./page/Admin/PasienAdmin";
import DokterAdmin from "./page/Admin/DokterAdmin";
import RekamMedis from "./components/Admin/RekamMedis/RekamMedis";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-pasien" element={<PasienAdmin />} />
        <Route path="/admin-dokter" element={<DokterAdmin />} />
        <Route path="/admin-rekammedis" element={<RekamMedis />} />
        <Route path="/Add-Pasien" element={<AddPasien />} />
        <Route path="/edit-pasien/:id" element={<EditPasien />} />
        <Route path="/Add-Dokter" element={<EditPasien />} />
        <Route path="/Add-pasien/:id" element={<EditPasien />} />
      </Routes>
    </div>
  );
}

export default App;
