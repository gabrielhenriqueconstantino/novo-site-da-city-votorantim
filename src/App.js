import './main/styles/global.css';
import './main/styles/App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './main/components/Header';
import Banner from './main/components/Banner';
import Hero from './main/components/Hero';
import Footer from './main/components/Footer';
import LinhaDetalhes from './linhas/LinhaDetalhes';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/:id" element={<LinhaDetalhes />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;