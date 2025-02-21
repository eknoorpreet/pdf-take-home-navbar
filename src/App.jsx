import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

import styles from './App.module.css';
import { useState } from 'react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <BrowserRouter>
      <Navbar
        theme={theme}
        setTheme={setTheme}
        navLinks={navLinks}
        logo={{
          src: '/logo.png',
          alt: 'PBS Logo',
          placement: 'left',
        }}
      />
      <div className={`${styles.container} ${styles[theme]}`}>
        <Routes>
          <Route path='/' element={<Home theme={theme} />} />
          <Route path='/about' element={<About theme={theme} />} />
          <Route path='/contact' element={<Contact theme={theme} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
