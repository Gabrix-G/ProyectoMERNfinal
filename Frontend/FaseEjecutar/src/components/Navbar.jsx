import React from 'react';
import { Users, Film, UserCheck, Home, Database } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'empleados', label: 'Empleados', icon: Users },
    { id: 'peliculas', label: 'Películas', icon: Film },
    { id: 'clientes', label: 'Clientes', icon: UserCheck },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Database className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">FaseEjecutar</span>
          </div>
          
          {/* Menu Items */}
          <div className="flex space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-white text-blue-900 shadow-md transform scale-105'
                      : 'text-white hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:block">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;