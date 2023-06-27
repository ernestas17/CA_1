/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Pagrindinis from './components/Pagrindinis';
import AtlyginimoMokesciuSkaiciuokle from './components/AtlyginimoMokesciuSkaiciuokle';
import IndividualiosVeiklosMokesciuSkaiciuokle from './components/IndividualiosVeiklosMokesciuSkaiciuokle';
import PvmSkaiciuokle from './components/PvmSkaiciuokle';
import ValiutuSkaiciuokle from './components/ValiutuSkaiciuokle';
import SumaZodziuSkaiciuokle from './components/SumaZodziuSkaiciuokle';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Pagrindinis />} />
        <Route
          path='/atlyginimo-mokesciu-skaiciuokle'
          element={<AtlyginimoMokesciuSkaiciuokle />}
        />
        <Route
          path='/individualios-veiklos-skaiciuokle'
          element={<IndividualiosVeiklosMokesciuSkaiciuokle />}
        />
        <Route path='/pvm-skaiciuokle' element={<PvmSkaiciuokle />} />
        <Route path='/valiutu-skaiciuokle' element={<ValiutuSkaiciuokle />} />
        <Route
          path='/suma-zodziu-skaiciuokle'
          element={<SumaZodziuSkaiciuokle />}
        />
      </Routes>
    </Router>
  );
};

export default App;
