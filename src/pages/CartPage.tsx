import React, { useState } from 'react';
import { FiArrowLeft, FiPlus, FiMinus, FiMapPin, FiCreditCard, FiTag, FiChevronRight, FiEdit3 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const CartPage = () => {
  const navigate = useNavigate();
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  
  const {
    items,
    deliveryAddress,
    paymentMethod,
    promoCode,
    discount,
    deliveryFee,
    updateQuantity,
    removeItem,
    setPromoCode,
    applyDiscount,
    getSubtotal,
    getTotal
  } = useCartStore();

  const handleBack = () => {
    navigate(-1);
  };

  const handleQuantityChange = (id: string, change: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      updateQuantity(id, item.quantity + change);
    }
  };

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      setPromoCode(promoInput);
      // Simuler l'application d'une réduction
      if (promoInput.toUpperCase() === 'DISCOUNT20') {
        applyDiscount(4.80);
      }
      setShowPromoInput(false);
      setPromoInput('');
    }
  };

  const handlePlaceOrder = () => {
    // Ici on ajouterait la logique de commande
    console.log('Commande passée:', {
      items,
      deliveryAddress,
      paymentMethod,
      total: getTotal()
    });
    // Navigation vers une page de confirmation
    alert('Commande passée avec succès !');
  };

  const subtotal = getSubtotal();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="max-w-mobile mx-auto px-4 pt-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiArrowLeft size={24} className="text-text-primary" />
            </button>
            <h1 className="text-xl font-semibold text-text-primary">Panier</h1>
          </div>

          {/* Empty Cart */}
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">🛒</span>
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">Votre panier est vide</h2>
            <p className="text-text-secondary text-center mb-6">
              Ajoutez des plats délicieux à votre panier pour commencer
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
            >
              Découvrir le menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="max-w-mobile mx-auto px-4 pt-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiArrowLeft size={24} className="text-text-primary" />
          </button>
          <h1 className="text-xl font-semibold text-text-primary">Checkout Orders</h1>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Deliver to</h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <FiMapPin size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-text-primary">{deliveryAddress.label}</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  default
                </span>
              </div>
              <p className="text-sm text-text-secondary">{deliveryAddress.address}</p>
            </div>
            <FiChevronRight size={20} className="text-text-secondary" />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Order Summary</h2>
            <button className="text-primary text-sm font-medium hover:text-primary-600 transition-colors">
              Add Items
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-text-primary mb-1">{item.name}</h3>
                  <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
                  {item.size && (
                    <p className="text-xs text-text-secondary">{item.size}</p>
                  )}
                  {item.extras && item.extras.length > 0 && (
                    <p className="text-xs text-text-secondary">+ {item.extras.join(', ')}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="font-medium text-text-primary w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-text-secondary hover:text-primary transition-colors"
                  >
                    <FiEdit3 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <FiCreditCard size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-text-primary">Payment Methods</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                E-Wallet
              </span>
              <FiChevronRight size={20} className="text-text-secondary" />
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <FiTag size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-text-primary">Get Discounts</span>
            </div>
            <div className="flex items-center gap-2">
              {promoCode ? (
                <span className="text-sm bg-primary text-white px-3 py-1 rounded-full">
                  {promoCode}
                </span>
              ) : (
                <button
                  onClick={() => setShowPromoInput(!showPromoInput)}
                  className="text-sm bg-primary text-white px-3 py-1 rounded-full hover:bg-primary-600 transition-colors"
                >
                  Discount 20%
                </button>
              )}
              <FiChevronRight size={20} className="text-text-secondary" />
            </div>
          </div>

          {showPromoInput && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Entrez votre code promo"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  Appliquer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Total */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Subtotal</span>
              <span className="font-medium text-text-primary">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Delivery Fee</span>
              <span className="font-medium text-text-primary">${deliveryFee.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Promo</span>
                <span className="font-medium text-primary">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-text-primary">Total</span>
                <span className="text-lg font-bold text-text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50">
        <div className="max-w-mobile mx-auto">
          <button
            onClick={handlePlaceOrder}
            className="w-full py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
          >
            <span>Place Order - ${total.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;