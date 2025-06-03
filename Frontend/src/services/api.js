// services/api.js

// Configuración base de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Función helper para hacer peticiones
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', 
    ...options,
  };

  
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    console.log('🔍 Haciendo petición a:', url);
    const response = await fetch(url, config);

    if (!response.ok) {
      // Si es error 401, limpiar token inválido
      if (response.status === 401) {
        localStorage.removeItem('token');
       
      }
      
      // MEJORADO: Manejo más específico de errores
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Si no se puede parsear el JSON, usar mensaje por defecto
      }
      
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// Servicios para clientes
export const clientService = {
  // Obtener todos los clientes
  getAll: () => apiRequest('/customers'),
  
  // Obtener cliente por ID
  getById: (id) => apiRequest(`/customers/${id}`),
  
  // Crear nuevo cliente
  create: (clientData) => apiRequest('/customers', {
    method: 'POST',
    body: JSON.stringify(clientData),
  }),
  
  // Actualizar cliente
  update: (id, clientData) => apiRequest(`/customers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(clientData),
  }),
  
  // Eliminar cliente
  delete: (id) => apiRequest(`/customers/${id}`, {
    method: 'DELETE',
  }),
};

// Servicios para empleados
export const employeeService = {
  getAll: () => apiRequest('/employee'),
  getById: (id) => apiRequest(`/employee/${id}`),
  create: (employeeData) => apiRequest('/employee', {
    method: 'POST',
    body: JSON.stringify(employeeData),
  }),
  update: (id, employeeData) => apiRequest(`/employee/${id}`, {
    method: 'PUT',
    body: JSON.stringify(employeeData),
  }),
  delete: (id) => apiRequest(`/employee/${id}`, {
    method: 'DELETE',
  }),
};

// Servicios para productos
export const productService = {
  getAll: () => apiRequest('/products'),
  getById: (id) => apiRequest(`/products/${id}`),
  create: (productData) => apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  update: (id, productData) => apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),
  delete: (id) => apiRequest(`/products/${id}`, {
    method: 'DELETE',
  }),
};

//  Servicio para sucursales
export const branchService = {
  getAll: () => apiRequest('/branches'),
  getById: (id) => apiRequest(`/branches/${id}`),
  create: (branchData) => apiRequest('/branches', {
    method: 'POST',
    body: JSON.stringify(branchData),
  }),
  update: (id, branchData) => apiRequest(`/branches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(branchData),
  }),
  delete: (id) => apiRequest(`/branches/${id}`, {
    method: 'DELETE',
  }),
};

// Servicio para reseñas
export const reviewService = {
  getAll: () => apiRequest('/reviews'),
  getById: (id) => apiRequest(`/reviews/${id}`),
  create: (reviewData) => apiRequest('/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  }),
  update: (id, reviewData) => apiRequest(`/reviews/${id}`, {
    method: 'PUT',
    body: JSON.stringify(reviewData),
  }),
  delete: (id) => apiRequest(`/reviews/${id}`, {
    method: 'DELETE',
  }),
};

// Servicios de autenticación
export const authService = {
  login: async (credentials) => {
    const response = await apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Guardar token si el login es exitoso
    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  },

  //  Registro de clientes y empleados
  registerClient: (userData) => apiRequest('/registerClients', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  registerEmployee: (userData) => apiRequest('/registerEmployees', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Recuperación de contraseña
  forgotPassword: (email) => apiRequest('/passwordRecovery', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),

  logout: async () => {
    try {
      //Hacer logout en el servidor también
      await apiRequest('/logout', { method: 'POST' });
    } catch (error) {
      console.error('Error al hacer logout en servidor:', error);
    } finally {
      // Siempre limpiar el token local
      localStorage.removeItem('token');
    }
  },

  getCurrentUser: () => apiRequest('/auth/me'),

  // Verificar si hay token válido
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // AÑADIDO: Obtener token actual
  getToken: () => localStorage.getItem('token'),
};