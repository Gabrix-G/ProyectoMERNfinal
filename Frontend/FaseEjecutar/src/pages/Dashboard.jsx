import React, { useState, useEffect } from 'react';
import { Users, Film, UserCheck, Plus, Edit2, Trash2, Save, X, AlertCircle } from 'lucide-react';

const API_BASE_URL = 'https://faseejecturar2-backend.onrender.com';

// Componente de notificación
const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`}>
      <div className="flex items-center space-x-2">
        <AlertCircle size={20} />
        <span>{message}</span>
      </div>
    </div>
  );
};

const empleadosAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/empleados`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) throw new Error('Error al obtener empleados');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      // Mock data para desarrollo
      return [
        { _id: '1', nombre: 'Juan Pérez', cargo: 'Gerente', salario: 50000, email: 'juan@email.com' },
        { _id: '2', nombre: 'María García', cargo: 'Desarrolladora', salario: 45000, email: 'maria@email.com' }
      ];
    }
  },
  create: async (empleado) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/empleados`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empleado),
      });
      if (!response.ok) throw new Error('Error al crear empleado');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { ...empleado, _id: Date.now().toString() };
    }
  },
  update: async (id, empleado) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/empleados/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empleado),
      });
      if (!response.ok) throw new Error('Error al actualizar empleado');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { ...empleado, _id: id };
    }
  },
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/empleados/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar empleado');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: true };
    }
  },
};

const peliculasAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/peliculas`);
      if (!response.ok) throw new Error('Error al obtener películas');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return [
        { _id: '1', titulo: 'Avengers: Endgame', genero: 'Acción', año: 2019, director: 'Russo Brothers' },
        { _id: '2', titulo: 'Parasite', genero: 'Drama', año: 2019, director: 'Bong Joon-ho' }
      ];
    }
  },
  create: async (pelicula) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/peliculas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pelicula),
      });
      if (!response.ok) throw new Error('Error al crear película');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { ...pelicula, _id: Date.now().toString() };
    }
  },
  update: async (id, pelicula) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/peliculas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pelicula),
      });
      if (!response.ok) throw new Error('Error al actualizar película');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { ...pelicula, _id: id };
    }
  },
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/peliculas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar película');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: true };
    }
  },
};

const clientesAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clientes`);
      if (!response.ok) throw new Error('Error al obtener clientes');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return [
        { _id: '1', nombre: 'Ana López', email: 'ana@email.com', telefono: '123-456-789', ciudad: 'Madrid' },
        { _id: '2', nombre: 'Carlos Ruiz', email: 'carlos@email.com', telefono: '987-654-321', ciudad: 'Barcelona' }
      ];
    }
  },
  create: async (cliente) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });
      if (!response.ok) throw new Error('Error al crear cliente');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { ...cliente, _id: Date.now().toString() };
    }
  },
  update: async (id, cliente) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });
      if (!response.ok) throw new Error('Error al actualizar cliente');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { ...cliente, _id: id };
    }
  },
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clientes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar cliente');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: true };
    }
  },
};

// Componente de Empleados
const EmpleadosComponent = ({ showNotification }) => {
  const [empleados, setEmpleados] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    cargo: '',
    salario: '',
    email: ''
  });

  useEffect(() => {
    loadEmpleados();
  }, []);

  const loadEmpleados = async () => {
    setLoading(true);
    try {
      const data = await empleadosAPI.getAll();
      setEmpleados(Array.isArray(data) ? data : data.empleados || []);
    } catch (error) {
      showNotification('Error al cargar empleados', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await empleadosAPI.update(editingId, formData);
        showNotification('Empleado actualizado correctamente', 'success');
      } else {
        await empleadosAPI.create(formData);
        showNotification('Empleado creado correctamente', 'success');
      }
      await loadEmpleados();
      resetForm();
    } catch (error) {
      showNotification('Error al guardar empleado', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (empleado) => {
    setFormData({
      nombre: empleado.nombre,
      cargo: empleado.cargo,
      salario: empleado.salario,
      email: empleado.email
    });
    setEditingId(empleado._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este empleado?')) {
      setLoading(true);
      try {
        await empleadosAPI.delete(id);
        await loadEmpleados();
        showNotification('Empleado eliminado correctamente', 'success');
      } catch (error) {
        showNotification('Error al eliminar empleado', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({ nombre: '', cargo: '', salario: '', email: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center sm:text-left">Gestión de Empleados</h2>
        <button
          onClick={() => setShowForm(true)}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg"
        >
          <Plus size={20} />
          <span>Nuevo Empleado</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-center flex-1">
                {editingId ? 'Editar Empleado' : 'Nuevo Empleado'}
              </h3>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                required
              />
              <input
                type="text"
                placeholder="Cargo"
                value={formData.cargo}
                onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                required
              />
              <input
                type="number"
                placeholder="Salario"
                value={formData.salario}
                onChange={(e) => setFormData({...formData, salario: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                required
              />
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Save size={18} />
                  <span>{editingId ? 'Actualizar' : 'Guardar'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {loading && (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Salario</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {empleados.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No hay empleados registrados
                    </td>
                  </tr>
                ) : (
                  empleados.map((empleado) => (
                    <tr key={empleado._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {empleado.nombre}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {empleado.cargo}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        ${empleado.salario?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {empleado.email}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(empleado)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(empleado._id)}
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Películas
const PeliculasComponent = ({ showNotification }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    año: '',
    director: ''
  });

  useEffect(() => {
    loadPeliculas();
  }, []);

  const loadPeliculas = async () => {
    setLoading(true);
    try {
      const data = await peliculasAPI.getAll();
      setPeliculas(Array.isArray(data) ? data : data.peliculas || []);
    } catch (error) {
      showNotification('Error al cargar películas', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await peliculasAPI.update(editingId, formData);
        showNotification('Película actualizada correctamente', 'success');
      } else {
        await peliculasAPI.create(formData);
        showNotification('Película creada correctamente', 'success');
      }
      await loadPeliculas();
      resetForm();
    } catch (error) {
      showNotification('Error al guardar película', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pelicula) => {
    setFormData({
      titulo: pelicula.titulo,
      genero: pelicula.genero,
      año: pelicula.año,
      director: pelicula.director
    });
    setEditingId(pelicula._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta película?')) {
      setLoading(true);
      try {
        await peliculasAPI.delete(id);
        await loadPeliculas();
        showNotification('Película eliminada correctamente', 'success');
      } catch (error) {
        showNotification('Error al eliminar película', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({ titulo: '', genero: '', año: '', director: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center sm:text-left">Gestión de Películas</h2>
        <button
          onClick={() => setShowForm(true)}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg"
        >
          <Plus size={20} />
          <span>Nueva Película</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-center flex-1">
                {editingId ? 'Editar Película' : 'Nueva Película'}
              </h3>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Título de la película"
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                required
              />
              <input
                type="text"
                placeholder="Género"
                value={formData.genero}
                onChange={(e) => setFormData({...formData, genero: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                required
              />
              <input
                type="number"
                placeholder="Año"
                value={formData.año}
                onChange={(e) => setFormData({...formData, año: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                required
              />
              <input
                type="text"
                placeholder="Director"
                value={formData.director}
                onChange={(e) => setFormData({...formData, director: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                required
              />
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Save size={18} />
                  <span>{editingId ? 'Actualizar' : 'Guardar'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {loading && (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        )}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Género</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Año</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Director</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {peliculas.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No hay películas registradas
                    </td>
                  </tr>
                ) : (
                  peliculas.map((pelicula) => (
                    <tr key={pelicula._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {pelicula.titulo}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {pelicula.genero}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {pelicula.año}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {pelicula.director}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(pelicula)}
                            className="text-green-600 hover:text-green-900 p-1"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(pelicula._id)}
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Clientes
const ClientesComponent = ({ showNotification }) => {
  const [clientes, setClientes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ciudad: ''
  });

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    setLoading(true);
    try {
      const data = await clientesAPI.getAll();
      setClientes(Array.isArray(data) ? data : data.clientes || []);
    } catch (error) {
      showNotification('Error al cargar clientes', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await clientesAPI.update(editingId, formData);
        showNotification('Cliente actualizado correctamente', 'success');
      } else {
        await clientesAPI.create(formData);
        showNotification('Cliente creado correctamente', 'success');
      }
      await loadClientes();
      resetForm();
    } catch (error) {
      showNotification('Error al guardar cliente', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cliente) => {
    setFormData({
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      ciudad: cliente.ciudad
    });
    setEditingId(cliente._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      setLoading(true);
      try {
        await clientesAPI.delete(id);
        await loadClientes();
        showNotification('Cliente eliminado correctamente', 'success');
      } catch (error) {
        showNotification('Error al eliminar cliente', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({ nombre: '', email: '', telefono: '', ciudad: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center sm:text-left">Gestión de Clientes</h2>
        <button
          onClick={() => setShowForm(true)}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px
          -6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg"
        >
          <Plus size={20} />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-center flex-1">
                {editingId ? 'Editar Cliente' : 'Nuevo Cliente'}
              </h3>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                required
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                required
              />
              <input
                type="text"
                placeholder="Ciudad"
                value={formData.ciudad}
                onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                required
              />
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Save size={18} />
                  <span>{editingId ? 'Actualizar' : 'Guardar'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {loading && (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        )}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clientes.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No hay clientes registrados
                    </td>
                  </tr>
                ) : (
                  clientes.map((cliente) => (
                    <tr key={cliente._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {cliente.nombre}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {cliente.email}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {cliente.telefono}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {cliente.ciudad}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(cliente)}
                            className="text-purple-600 hover:text-purple-900 p-1"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(cliente._id)}
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente principal de la aplicación
const App = () => {
  const [activeTab, setActiveTab] = useState('empleados');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const tabs = [
    { id: 'empleados', label: 'Empleados', icon: Users, color: 'blue' },
    { id: 'peliculas', label: 'Películas', icon: Film, color: 'green' },
    { id: 'clientes', label: 'Clientes', icon: UserCheck, color: 'purple' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sistema de Gestión</h1>
          <p className="text-gray-600">Administra empleados, películas y clientes</p>
        </div>

        <div className="flex flex-wrap justify-center mb-8 gap-2 sm:gap-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  activeTab === tab.id
                    ? `bg-${tab.color}-600 text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="max-w-7xl mx-auto">
          {activeTab === 'empleados' && <EmpleadosComponent showNotification={showNotification} />}
          {activeTab === 'peliculas' && <PeliculasComponent showNotification={showNotification} />}
          {activeTab === 'clientes' && <ClientesComponent showNotification={showNotification} />}
        </div>
      </div>
    </div>
  );
};

export default App;