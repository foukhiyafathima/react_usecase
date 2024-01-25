import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FilterModel from './components/FilterModel.js';
import RenderMainComponent from './components/RenderMainComponent.js';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RenderMainComponent />} />
          <Route path='/view-filters' element={<FilterModel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
