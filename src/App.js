import { useState } from 'react';
import './main/styles/global.css';
import './main/styles/App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './main/components/Header';
import Banner from './main/components/Banner';
import Hero from './main/components/Hero';
import Footer from './main/components/Footer';
import LinhaDetalhes from './linhas/horarios/LinhaDetalhes';
import Itinerarios from './linhas/itinerarios/ItinerarioDetalhes';

function App() {
  const location = useLocation();

  // Define se estamos na rota de itinerários
  const isItinerariosRoute = location.pathname.startsWith('/itinerarios');

  return (
    <div className="App">
      <Header setShowItinerarios={() => {}} />
      <Banner />
      <Routes>
        <Route
          path="/"
          element={<Hero showItinerarios={false} />}
        />
        <Route
          path="/itinerarios"
          element={<Hero showItinerarios={true} />}
        />
        <Route
          path="/:id"
          element={<LinhaDetalhes />}
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
