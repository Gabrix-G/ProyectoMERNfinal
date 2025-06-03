import React, { useState, useEffect } from 'react';
import { employeeService } from '../services/api';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: ''
  });

  // Cargar empleados al iniciar
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (error) {
      console.error('Error cargando empleados:', error);
      alert('Error al cargar empleados');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await employeeService.create(formData);
      setFormData({ name: '', email: '', phone: '', position: '' });
      setShowForm(false);
      loadEmployees(); // Recargar la lista
      alert('Empleado guardado exitosamente');
    } catch (error) {
      console.error('Error guardando empleado:', error);
      alert('Error al guardar empleado');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <div className="p-6">Cargando empleados...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Empleados</h1>
          <p className="text-gray-600">Gestiona tu equipo de trabajo</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          + Nuevo Empleado
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ingresa el nombre"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@ejemplo.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+503 0000-0000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cargo</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Dirección completa"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                Guardar Empleado
              </button>
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de empleados */}
      {employees.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👤</div>
          <h3 className="text-lg font-medium mb-2">No hay empleados</h3>
          <p className="text-gray-600">Agrega tu primer empleado para comenzar</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-4 gap-4 p-4 border-b font-medium">
            <div>Nombre</div>
            <div>Email</div>
            <div>Teléfono</div>
            <div>Cargo</div>
          </div>
          {employees.map((employee) => (
            <div key={employee._id} className="grid grid-cols-4 gap-4 p-4 border-b">
              <div>{employee.name}</div>
              <div>{employee.email}</div>
              <div>{employee.phone}</div>
              <div>{employee.position}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Employees;