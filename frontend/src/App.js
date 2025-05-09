import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

// Placeholder components
function About() {
  return <h1>About Page</h1>;
}

function Services() {
  return <h1>Services Page</h1>;
}

function Trainings() {
  return <h1>Trainings Page</h1>;
}

function Contact() {
  return <h1>Contact Page</h1>;
}

function Search() {
  return <h1>Search Page</h1>;
}

export default App;
