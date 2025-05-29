import React, { useState } from 'react';
import { User, Users, Package, Home } from 'lucide-react';
import Employees from './components/Employees';
import Customers from './components/Customers';
import Products from './components/Products';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'employees':
        return <Employees />;
      case 'customers':
        return <Customers />;
      case 'products':
        return <Products />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center p-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white rounded-3xl shadow-2xl p-12">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Home className="text-white" size={40} />
                </div>
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                  Sistema de Gestión
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Administra empleados, clientes y productos desde una sola plataforma
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div 
                    onClick={() => setActiveTab('employees')}
                    className="cursor-pointer bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-indigo-200"
                  >
                    <User className="text-indigo-600 mx-auto mb-4" size={48} />
                    <h3 className="text-xl font-bold text-indigo-800 mb-2">Empleados</h3>
                    <p className="text-indigo-600">Gestiona tu equipo de trabajo</p>
                  </div>
                  
                  <div 
                    onClick={() => setActiveTab('customers')}
                    className="cursor-pointer bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-emerald-200"
                  >
                    <Users className="text-emerald-600 mx-auto mb-4" size={48} />
                    <h3 className="text-xl font-bold text-emerald-800 mb-2">Clientes</h3>
                    <p className="text-emerald-600">Administra tu base de clientes</p>
                  </div>
                  
                  <div 
                    onClick={() => setActiveTab('products')}
                    className="cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-purple-200"
                  >
                    <Package className="text-purple-600 mx-auto mb-4" size={48} />
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Productos</h3>
                    <p className="text-purple-600">Controla tu inventario</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div 
                onClick={() => setActiveTab('home')}
                className="cursor-pointer flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Home className="text-white" size={16} />
                </div>
                <span className="text-xl font-bold text-gray-800">Admin Panel</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('employees')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'employees'
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <User size={18} />
                <span>Empleados</span>
              </button>
              
              <button
                onClick={() => setActiveTab('customers')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'customers'
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <Users size={18} />
                <span>Clientes</span>
              </button>
              
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'products'
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Package size={18} />
                <span>Productos</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;