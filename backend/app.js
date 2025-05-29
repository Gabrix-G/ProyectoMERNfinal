// Importaciones
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Importar rutas
import productsRoutes from "./src/routes/products.js";
import customersRoutes from "./src/routes/customers.js";
import employeeRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js";
import reviewsRoutes from "./src/routes/reviews.js";
import registerEmployeesRoutes from "./src/routes/registerEmployees.js";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import registerClients from "./src/routes/registerClients.js";
import passwordRecoveryRouter from "./src/routes/passwordRecovery.js";

// Configurar dotenv
dotenv.config();

// Crear instancia de Express
const app = express();
const PORT = process.env.PORT || 4000;

// CONFIGURAR CORS
app.use(cors({
  origin: [
    'http://localhost:5173', // Puerto de Vite
    'http://localhost:3000', // Puerto alternativo
    'http://127.0.0.1:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

console.log('🔍 Intentando conectar a MongoDB...');
console.log('🔍 URI de conexión:', process.env.DB_URI);

// Conexión a MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB exitosamente');
    console.log('✅ Base de datos:', mongoose.connection.name);
  })
  .catch((error) => {
    console.error('❌ Error detallado conectando a MongoDB:');
    console.error('❌ Mensaje:', error.message);
    console.error('❌ Código:', error.code);
    console.error('❌ Stack completo:', error);
  });
  mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('🔥 Error de conexión Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📴 Mongoose desconectado de MongoDB');
});

// Definir las rutas
app.use("/api/products", productsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/registerClients", registerClients);
app.use("/api/passwordRecovery", passwordRecoveryRouter);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend funcionando correctamente' });
});

// Manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}/api`);
});

// Exportar la aplicación
export default app;