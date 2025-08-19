import React, { useState } from 'react';
import { FiArrowLeft, FiPhone, FiMail, FiGlobe, FiMapPin, FiStar, FiWifi, FiHome, FiPackage, FiTruck, FiShield, FiEye, FiUsers } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
}

const RestaurantInfoPage = () => {
  const navigate = useNavigate();
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const restaurant = {
    id: '1',
    name: 'Gabriel Kreuther',
    description: 'A distinguished fine-dining restaurant located at 41 West 42nd Street in New York City, directly across Bryant Park.',
    imageUrl: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    logoUrl: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.8,
    reviewsCount: 1247,
    isOpen: true,
    openingHours: '11:30 AM - 11:00 PM',
    phone: '+1 (212) 257-5826',
    email: 'info@gabrielkreuther.com',
    website: 'www.gabrielkreuther.com',
    address: '41 West 42nd Street, New York, NY',
    socialMedia: {
      instagram: '@gabrielkreuther',
      facebook: 'gabrielkreuther',
      tiktok: '@gabrielkreuther'
    }
  };

  const amenities = [
    { icon: FiWifi, label: 'Wi-Fi gratuit' },
    { icon: FiUsers, label: 'Accessible PMR' },
    { icon: FaCar, label: 'Parking' },
    { icon: FiHome, label: 'Terrasse' },
    { icon: FiPackage, label: 'À emporter' },
    { icon: FiTruck, label: 'Livraison' },
  ];

  const hygieneSafety = [
    { icon: FiEye, label: 'Cuisine ouverte' },
    { icon: FiShield, label: 'Gants & masques' },
    { icon: FiShield, label: 'Désinfection régulière' },
  ];

  const reviews: Review[] = [
    {
      id: '1',
      name: 'Marie Dubois',
      date: '2 jours',
      rating: 5,
      comment: 'Excellente expérience culinaire ! Le service était impeccable et les plats délicieux.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '2',
      name: 'Pierre Martin',
      date: '1 semaine',
      rating: 4,
      comment: 'Très bon restaurant, ambiance agréable. Je recommande vivement !',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      date: '2 semaines',
      rating: 5,
      comment: 'Un moment magique ! La qualité des produits est exceptionnelle.',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 856, percentage: 69 },
    { stars: 4, count: 248, percentage: 20 },
    { stars: 3, count: 87, percentage: 7 },
    { stars: 2, count: 31, percentage: 2 },
    { stars: 1, count: 25, percentage: 2 },
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewRating > 0 && newReviewComment.trim()) {
      // Ici on ajouterait la logique pour soumettre l'avis
      console.log('Nouvel avis:', { rating: newReviewRating, comment: newReviewComment });
      setNewReviewRating(0);
      setNewReviewComment('');
    }
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onStarClick?.(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <FiStar
              size={interactive ? 24 : 16}
              className={`${
                star <= rating
                  ? 'text-accent fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header avec image hero */}
      <div className="relative">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Bouton retour */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors z-10"
        >
          <FiArrowLeft size={24} className="text-text-primary" />
        </button>

        {/* Logo du restaurant */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white">
            <img
              src={restaurant.logoUrl}
              alt={`${restaurant.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-mobile mx-auto px-4 pt-12">
        {/* Informations principales */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-text-primary">{restaurant.name}</h1>
            <div className="flex items-center gap-1">
              <FiStar size={20} className="text-accent fill-current" />
              <span className="text-lg font-semibold text-text-primary">{restaurant.rating}</span>
            </div>
          </div>
          <p className="text-text-secondary mb-4 leading-relaxed">
            {restaurant.description}
          </p>
          
          {/* Statut et horaires */}
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className={`px-3 py-1 rounded-full font-medium ${
              restaurant.isOpen 
                ? 'bg-primary/10 text-primary' 
                : 'bg-red-100 text-red-600'
            }`}>
              {restaurant.isOpen ? 'Ouvert' : 'Fermé'}
            </span>
            <span className="text-text-secondary">{restaurant.openingHours}</span>
          </div>
        </div>

        {/* Section Informations */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Informations</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiPhone size={20} className="text-primary" />
              <span className="text-text-primary">{restaurant.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMail size={20} className="text-primary" />
              <span className="text-text-primary">{restaurant.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiGlobe size={20} className="text-primary" />
              <span className="text-text-primary">{restaurant.website}</span>
            </div>
            <div className="flex items-start gap-3">
              <FiMapPin size={20} className="text-primary mt-0.5" />
              <div className="flex-1">
                <span className="text-text-primary">{restaurant.address}</span>
                <button className="block mt-2 text-primary text-sm font-medium hover:text-primary-600 transition-colors">
                  Voir sur la carte
                </button>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-text-primary mb-3">Suivez-nous</h3>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                <FaInstagram size={20} />
                <span className="text-sm">{restaurant.socialMedia.instagram}</span>
              </button>
              <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                <FaFacebook size={20} />
                <span className="text-sm">{restaurant.socialMedia.facebook}</span>
              </button>
              <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                <FaTiktok size={20} />
                <span className="text-sm">{restaurant.socialMedia.tiktok}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section Équipements & Services */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Équipements & Services</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3">
                <amenity.icon size={20} className="text-primary" />
                <span className="text-text-primary text-sm">{amenity.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-text-primary mb-3">Hygiène & Sécurité</h3>
            <div className="space-y-3">
              {hygieneSafety.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <item.icon size={18} className="text-primary" />
                  <span className="text-text-primary text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Avis des clients */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Avis des clients</h2>
          
          {/* Note globale */}
          <div className="flex items-center gap-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-text-primary mb-1">{restaurant.rating}</div>
              {renderStars(restaurant.rating)}
              <div className="text-sm text-text-secondary mt-1">
                {restaurant.reviewsCount} avis
              </div>
            </div>
            
            {/* Diagramme de répartition */}
            <div className="flex-1">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-text-secondary w-2">{item.stars}</span>
                  <FiStar size={12} className="text-accent fill-current" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-text-secondary w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Liste des avis */}
          <div className="space-y-4 mb-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-start gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-text-primary text-sm">{review.name}</span>
                      <span className="text-xs text-text-secondary">Il y a {review.date}</span>
                    </div>
                    {renderStars(review.rating)}
                    <p className="text-text-secondary text-sm mt-2 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire d'avis */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-text-primary mb-3">Laisser un avis</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Note</label>
                {renderStars(newReviewRating, true, setNewReviewRating)}
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Commentaire</label>
                <textarea
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Partagez votre expérience..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary resize-none"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                disabled={newReviewRating === 0 || !newReviewComment.trim()}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Publier l'avis
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfoPage;