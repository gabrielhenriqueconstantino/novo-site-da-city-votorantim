import './styles/global.css';
import './styles/App.css';

import Header from './components/Header';
import Banner from './components/Banner';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Footer />
    </div>
  );
}

export default App;
