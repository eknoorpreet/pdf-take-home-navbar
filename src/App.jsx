import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

import { ThemeContextProvider } from './context/ThemeContext';
import styles from './App.module.css';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Navbar
          navLinks={navLinks}
          logo={{
            src: '/logo.png',
            alt: 'PBS Logo',
            placement: 'left',
          }}
        />
        <div className={styles.container}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
