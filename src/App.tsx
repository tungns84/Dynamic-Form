// src/App.tsx
import React, { useState } from 'react';
//import FormBuilderComponent from './components/FormBuilderComponent';
import FormBuilderComponent from './components/FormBuilder';
import FormSelector from './components/FormSelector';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'builder' | 'forms'>('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'builder':
        return <FormBuilderComponent />;
      case 'forms':
        return <FormSelector />;
      case 'home':
      default:
        return <Home setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span 
            className="navbar-brand" 
            onClick={() => setCurrentPage('home')}
            style={{ cursor: 'pointer' }}
          >
            Dynamic Form App
          </span>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <span 
                  className={`nav-link ${currentPage === 'builder' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('builder')}
                  style={{ cursor: 'pointer' }}
                >
                  Tạo Form
                </span>
              </li>
              <li className="nav-item">
                <span 
                  className={`nav-link ${currentPage === 'forms' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('forms')}
                  style={{ cursor: 'pointer' }}
                >
                  Nhập Liệu
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        {renderContent()}
      </div>
    </div>
  );
}

interface HomeProps {
  setPage: (page: 'home' | 'builder' | 'forms') => void;
}

const Home: React.FC<HomeProps> = ({ setPage }) => {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Ứng dụng Form Động</h1>
      <p className="lead">
        Tạo form động, lưu trữ và nhập liệu
      </p>
      <hr className="my-4" />
      <p>
        Frontend: FormIO + React TypeScript + Boostrap.
      </p>
      <p>
        Backend: Springboot.
      </p>
      {/* <div className="d-flex gap-2">
        <button 
          onClick={() => setPage('builder')} 
          className="btn btn-primary me-2"
        >
          Bắt đầu tạo form
        </button>
        <button 
          onClick={() => setPage('forms')} 
          className="btn btn-success"
        >
          Nhập liệu
        </button>
      </div> */}
    </div>
  );
}

export default App;