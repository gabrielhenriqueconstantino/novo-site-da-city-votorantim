import { useState } from 'react';
import './pages/user/main/styles/global.css';
import './pages/user/main/styles/App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Header from './pages/user/main/components/Header';
import Banner from './pages/user/main/components/Banner';
import Hero from './pages/user/main/components/Hero';
import Footer from './pages/user/main/components/Footer';
import LinhaDetalhes from './pages/user/linhas/horarios/LinhaDetalhes';
import Itinerarios from './pages/user/linhas/itinerarios/ItinerarioDetalhes';
import Cadastro from './pages/user/main/components/Cadastro';
import Contato from './pages/user/main/components/Contato';

//do painel administrativo
import Login from './pages/admin/login/Login';
import Dashboard from './pages/admin/dashboard/layout/Dashboard';
import PrivateRoute from './pages/admin/PrivateRoute';


function App() {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [showItinerarios, setShowItinerarios] = useState(false);

  // Verifica se a rota atual é '/cadastro' ou '/contato' ou '/login'
  const shouldShowBanner = !['/cadastro', '/contato', '/login', '/admin'].includes(location.pathname);
  
  // Verifica se a rota atual NÃO é '/login' para mostrar o Footer
  const shouldShowFooter = !['/login', '/admin'].includes(location.pathname);
  
  // Verifica se a rota atual NÃO começa com '/admin' para mostrar o Header
  const shouldShowHeader = !location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {shouldShowHeader && <Header setShowItinerarios={setShowItinerarios} />}
      {shouldShowBanner && <Banner />}
      <Routes>
        <Route path="/" element={<Navigate to="/horarios" replace />} />
        <Route path="/horarios" element={<Hero showItinerarios={false} />} />
        <Route path="/horarios/:id" element={<LinhaDetalhes />} />
        <Route path="/itinerarios" element={<Hero showItinerarios={true} />} />
        <Route path="/itinerarios/:linhaId" element={<Itinerarios />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default App;