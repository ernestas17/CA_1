/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Pagrindinis from "./components/Pagrindinis";
import AtlyginimoMokesciuSkaiciuokle from "./components/AtlyginimoMokesciuSkaiciuokle";
import IndividualiosVeiklosMokesciuSkaiciuokle from "./components/IndividualiosVeiklosMokesciuSkaiciuokle";
import PvmSkaiciuokle from "./components/PvmSkaiciuokle";
import ValiutuSkaiciuokle from "./components/ValiutuSkaiciuokle";
import SumaZodziu from "./components/SumaZodziu";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pagrindinis />} />
        <Route
          path="/atlyginimas"
          element={<AtlyginimoMokesciuSkaiciuokle />}
        />
        <Route
          path="/individuali-veikla"
          element={<IndividualiosVeiklosMokesciuSkaiciuokle />}
        />
        <Route path="/pvm" element={<PvmSkaiciuokle />} />
        <Route path="/valiutos" element={<ValiutuSkaiciuokle />} />
        <Route path="/suma-zodziu" element={<SumaZodziu />} />
      </Routes>
    </Router>
  );
};

export default App;
