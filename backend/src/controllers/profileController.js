const Profile = require('../models/profileModel');
const path = require('path');
const fs = require('fs');

exports.createProfile = async (req, res) => {
  try {
    const profileData = { ...req.body };
    
    // Ajouter le chemin de l'image si un fichier a été uploadé
    if (req.file) {
      profileData.profileImage = `/uploads/profiles/${req.file.filename}`;
    }
    
    const profile = await Profile.create(profileData);
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    
    const updateData = { ...req.body };
    
    // Gérer la nouvelle image
    if (req.file) {
      // Supprimer l'ancienne image si elle existe
      if (profile.profileImage) {
        const oldImagePath = path.join(__dirname, '../../../', profile.profileImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.profileImage = `/uploads/profiles/${req.file.filename}`;
    }
    
    await profile.update(updateData);
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    
    // Supprimer l'image associée
    if (profile.profileImage) {
      const imagePath = path.join(__dirname, '../../../', profile.profileImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await profile.destroy();
    res.json({ message: 'Profil supprimé avec succès' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.json(profiles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};