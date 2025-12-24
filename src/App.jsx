import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import { students } from './data/students';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StudentList students={students} />} />
          <Route path="/students/:id" element={<StudentDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

