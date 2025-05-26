// services/api.js
const API_BASE_URL = 'http://localhost:4000'; // Ajusta según tu puerto del backend

// Empleados API
export const empleadosAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/empleados`);
    return response.json();
  },
  
  create: async (empleado) => {
    const response = await fetch(`${API_BASE_URL}/empleados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleado),
    });
    return response.json();
  },
  
  update: async (id, empleado) => {
    const response = await fetch(`${API_BASE_URL}/empleados/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleado),
    });
    return response.json();
  },
  
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/empleados/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

// Películas API
export const peliculasAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/peliculas`);
    return response.json();
  },
  
  create: async (pelicula) => {
    const response = await fetch(`${API_BASE_URL}/peliculas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pelicula),
    });
    return response.json();
  },
  
  update: async (id, pelicula) => {
    const response = await fetch(`${API_BASE_URL}/peliculas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pelicula),
    });
    return response.json();
  },
  
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/peliculas/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

// Clientes API
export const clientesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/clientes`);
    return response.json();
  },
  
  create: async (cliente) => {
    const response = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    });
    return response.json();
  },
  
  update: async (id, cliente) => {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    });
    return response.json();
  },
  
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};