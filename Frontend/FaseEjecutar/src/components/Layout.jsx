// components/Layout.jsx
import React, { useState } from 'react';
import '../styles/globals.css';

const Layout = ({ children }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'empleados', name: 'Empleados', icon: '👥' },
    { id: 'peliculas', name: 'Películas', icon: '🎬' },
    { id: 'clientes', name: 'Clientes', icon: '👤' }
  ];

  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">📋</span>
            <h2>FaseEjecutar</h2>
          </div>
          <p className="subtitle">Sistema integral de gestión empresarial</p>
        </div>
        
        <ul className="menu">
          {menuItems.map(item => (
            <li key={item.id} className={activeSection === item.id ? 'active' : ''}>
              <button 
                onClick={() => setActiveSection(item.id)}
                className="menu-button"
              >
                <span className="menu-icon">{item.icon}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="main-content">
        {React.cloneElement(children, { activeSection })}
      </main>
    </div>
  );
};

export default Layout;