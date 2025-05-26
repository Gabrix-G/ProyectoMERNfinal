import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Mail, Phone, User, Save, X } from 'lucide-react';

const empleadosAPI = {
  getAll: async () => {
    // Simula datos basados en base de MongoDB
    return [
      {
        _id: '683473089f9210b6a904ff4a',
        nombre: 'Ana Martínez',
        email: 'ana.martinez@email.com',
        telefono: '555-3456',
        rol: 'Empleado'
      },
      {
        _id: '683473109f9210b6a904ff50',
        nombre: 'Luis Fernández',
        email: 'luis.fernandez@email.com',
        telefono: '555-7890',
        rol: 'Empleado'
      },
      {
        _id: '683473109f9210b6a904ff52',
        nombre: 'Sofía Ramírez',
        email: 'sofia.ramirez@email.com',
        telefono: '555-2345',
        rol: 'Empleado'
      }
    ];
  },
  create: async (empleado) => ({ ...empleado, _id: Date.now().toString() }),
  update: async (id, empleado) => ({ ...empleado, _id: id }),
  delete: async (id) => ({ success: true })
};

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    rol: 'Empleado'
  });

  useEffect(() => {
    loadEmpleados();
  }, []);

  const loadEmpleados = async () => {
    try {
      setLoading(true);
      const data = await empleadosAPI.getAll();
      setEmpleados(data);
    } catch (error) {
      console.error('Error cargando empleados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await empleadosAPI.update(editingId, formData);
        setEmpleados(empleados.map(emp => emp._id === editingId ? updated : emp));
      } else {
        const newEmpleado = await empleadosAPI.create(formData);
        setEmpleados([...empleados, newEmpleado]);
      }
      resetForm();
    } catch (error) {
      console.error('Error guardando empleado:', error);
    }
  };

  const handleEdit = (empleado) => {
    setFormData(empleado);
    setEditingId(empleado._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este empleado?')) {
      try {
        await empleadosAPI.delete(id);
        setEmpleados(empleados.filter(emp => emp._id !== id));
      } catch (error) {
        console.error('Error eliminando empleado:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ nombre: '', email: '', telefono: '', rol: 'Empleado' });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <User className="h-8 w-8 text-blue-600" />
            Gestión de Empleados
          </h1>
          <p className="text-gray-600 mt-1">Administra la información de los empleados</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          Nuevo Empleado
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? 'Editar Empleado' : 'Nuevo Empleado'}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select
                  value={formData.rol}
                  onChange={(e) => setFormData({...formData, rol: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Empleado">Empleado</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {editingId ? 'Actualizar' : 'Guardar'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-200"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de empleados siguiendo la misma formula de clientes y oeliculas*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {empleados.map((empleado) => (
          <div key={empleado._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{empleado.nombre}</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{empleado.rol}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{empleado.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{empleado.telefono}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(empleado)}
                  className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(empleado._id)}
                  className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {empleados.length === 0 && (
        <div className="text-center py-12">
          <User className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600">No hay empleados registrados</h3>
          <p className="text-gray-500 mt-2">Comienza agregando tu primer empleado</p>
        </div>
      )}
    </div>
  );
};

export default Empleados;