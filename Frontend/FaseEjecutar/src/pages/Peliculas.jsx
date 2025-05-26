import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Film, Calendar, Clock, User, Save, X, Star } from 'lucide-react';

// Simulación de API basada en tus datos
const peliculasAPI = {
  getAll: async () => {
    return [
      {
        _id: '6823a478636926d696b1d95',
        titulo: 'Cars 2',
        descripcion: 'Carritos de una world cup épica',
        director: 'John Lasseter',
        genero: 'Ficción',
        anio: '24 de junio de 2011',
        duracion: '1h 46m'
      },
      {
        _id: '6823a566786392d696b1d99',
        titulo: 'Avatar 3',
        descripcion: 'Una especie diferente a la humanidad azules y que defienden su tierra',
        director: 'James Cameron',
        genero: 'Acción, Ficción',
        anio: '19 de diciembre de 2025',
        duracion: '3h 12m'
      },
      {
        _id: '6823a6437863926d696b1d9d',
        titulo: 'Iron Man: el hombre de hierro',
        descripcion: 'Un empresario millonario construye un traje blindado y lo usa para com...',
        director: 'Jon Favreau',
        genero: 'Acción',
        anio: '2 de mayo de 2008',
        duracion: '2h 6m'
      }
    ];
  },
  create: async (pelicula) => ({ ...pelicula, _id: Date.now().toString() }),
  update: async (id, pelicula) => ({ ...pelicula, _id: id }),
  delete: async (id) => ({ success: true })
};

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    director: '',
    genero: '',
    anio: '',
    duracion: ''
  });

  useEffect(() => {
    loadPeliculas();
  }, []);

  const loadPeliculas = async () => {
    try {
      setLoading(true);
      const data = await peliculasAPI.getAll();
      setPeliculas(data);
    } catch (error) {
      console.error('Error cargando películas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await peliculasAPI.update(editingId, formData);
        setPeliculas(peliculas.map(pel => pel._id === editingId ? updated : pel));
      } else {
        const newPelicula = await peliculasAPI.create(formData);
        setPeliculas([...peliculas, newPelicula]);
      }
      resetForm();
    } catch (error) {
      console.error('Error guardando película:', error);
    }
  };

  const handleEdit = (pelicula) => {
    setFormData(pelicula);
    setEditingId(pelicula._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta película?')) {
      try {
        await peliculasAPI.delete(id);
        setPeliculas(peliculas.filter(pel => pel._id !== id));
      } catch (error) {
        console.error('Error eliminando película:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ titulo: '', descripcion: '', director: '', genero: '', anio: '', duracion: '' });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Film className="h-8 w-8 text-purple-600" />
            Catálogo de Películas
          </h1>
          <p className="text-gray-600 mt-1">Administra tu colección de películas</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          Nueva Película
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? 'Editar Película' : 'Nueva Película'}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Director</label>
                  <input
                    type="text"
                    value={formData.director}
                    onChange={(e) => setFormData({...formData, director: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
                  <input
                    type="text"
                    value={formData.genero}
                    onChange={(e) => setFormData({...formData, genero: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ej: Acción, Drama"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Año/Fecha</label>
                  <input
                    type="text"
                    value={formData.anio}
                    onChange={(e) => setFormData({...formData, anio: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ej: 2024"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duración</label>
                  <input
                    type="text"
                    value={formData.duracion}
                    onChange={(e) => setFormData({...formData, duracion: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ej: 2h 30m"
                    required
                  />
                </div>
              </div>
              
      {/* Botones de forma visual */}


              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
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
            </div>
          </div>
        </div>
      )}

      {/* Aqui estara la listaaa de peliculas representadas de forma viual en la pagina */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {peliculas.map((pelicula) => (
          <div key={pelicula._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2"></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{pelicula.titulo}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pelicula.descripcion}</p>
                </div>
                <div className="ml-2 flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">4.5</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{pelicula.director}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{pelicula.anio}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{pelicula.duracion}</span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  {pelicula.genero}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(pelicula)}
                  className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(pelicula._id)}
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

      {peliculas.length === 0 && (
        <div className="text-center py-12">
          <Film className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600">No hay películas registradas</h3>
          <p className="text-gray-500 mt-2">Comienza agregando tu primera película</p>
        </div>
      )}
    </div>
  );
};

export default Peliculas;