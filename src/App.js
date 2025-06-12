import { useState } from 'react';
import './main/styles/global.css';
import './main/styles/App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Header from './main/components/Header';
import Banner from './main/components/Banner';
import Hero from './main/components/Hero';
import Footer from './main/components/Footer';
import LinhaDetalhes from './linhas/horarios/LinhaDetalhes';
import Itinerarios from './linhas/itinerarios/ItinerarioDetalhes';

function App() {
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [showItinerarios, setShowItinerarios] = useState(false);

  return (
    <div className="App">
      <Header setShowItinerarios={setShowItinerarios} />
      <Banner />
      <Routes>
        <Route path="/" element={<Navigate to="/horarios" replace />} />
        <Route
          path="/horarios"
          element={<Hero showItinerarios={false} />}
        />
        <Route
          path="/horarios/:id"
          element={<LinhaDetalhes />}
        />
        <Route
          path="/itinerarios"
          element={<Hero showItinerarios={true} />}
        />
        <Route
          path="/itinerarios/:linhaId"
          element={<Itinerarios />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;