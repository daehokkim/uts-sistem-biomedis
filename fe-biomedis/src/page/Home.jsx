import DokterDetail from '../components/Dokter/DokterDetail';
import RekamMedisDetail from '../components/RekamMedis/RekamMedisDetail';

const Home = () => {
  return (
    <>
      <div>
        <RekamMedisDetail/>
      </div>
      <div>
        <DokterDetail/>
      </div>
    </>
  );
};

export default Home;
