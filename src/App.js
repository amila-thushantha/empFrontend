import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <div className="container">
        <Routes>
          <Route path="/employees" exact element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<AddEmployeeComponent />} component={<AddEmployeeComponent />} />
          <Route path="/edit-employee/:id" element={<AddEmployeeComponent />} component={<AddEmployeeComponent />} />
        </Routes>
      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;