const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./src/config/database');
const profileRoutes = require('./src/routes/profileRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (images uploadées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Vérifier connexion
sequelize.authenticate()
  .then(() => console.log("✅ PostgreSQL connecté via Sequelize"))
  .catch(err => console.error("❌ Erreur connexion :", err));

// Synchroniser les tables
sequelize.sync({ alter: true })
  .then(() => console.log("📦 Tables synchronisées"))
  .catch(err => console.error("❌ Erreur sync:", err));

// Routes
app.use('/api/profiles', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));