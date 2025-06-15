import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import CurrentGame from './pages/CurrentGame'
import Donate from './pages/Donate'
import './css/styles.css';
import './css/header.css';
import './css/logo.css';
import './css/main-body.css';
import './css/site.css';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/currentGame" element={<CurrentGame />} />
                <Route path="/Donate" element={<Donate />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
