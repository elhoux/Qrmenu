const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./src/config/database');
const profileRoutes = require('./src/routes/profileRoutes');
const productRoutes = require('./src/routes/productRoutes');
const productLikeRoutes = require('./src/routes/productLikeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (images uploadées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Serve product images placed in backend/images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Vérifier connexion
sequelize.authenticate()
  .then(() => console.log("✅ PostgreSQL connecté via Sequelize"))
  .catch(err => console.error("❌ Erreur connexion :", err));

// Synchroniser les tables
const seedProducts = require('./src/config/seedProducts');

sequelize.sync({ alter: true })
  .then(async () => {
    console.log("📦 Tables synchronisées");
    await seedProducts();
  })
  .catch(err => console.error("❌ Erreur sync:", err));

// Routes
app.use('/api/profiles', profileRoutes);
app.use('/api/products', productRoutes);
app.use('/api/product-likes', productLikeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));