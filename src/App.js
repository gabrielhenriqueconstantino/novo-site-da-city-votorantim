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
import Cadastro from './main/components/Cadastro';
import Contato from './main/components/Contato';

function App() {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [showItinerarios, setShowItinerarios] = useState(false);

  // Verifica se a rota atual é '/cadastro'
  const shouldShowBanner = location.pathname !== '/cadastro' && location.pathname !== '/contato';

  return (
    <div className="App">
      <Header setShowItinerarios={setShowItinerarios} />
      {shouldShowBanner && <Banner />}
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
        <Route
          path="/cadastro"
          element={<Cadastro />}
        />
        <Route 
          path="/contato"
          element={<Contato />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;