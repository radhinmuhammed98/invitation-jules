import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { RSVPAdmin } from './pages/RSVPAdmin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<RSVPAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}
