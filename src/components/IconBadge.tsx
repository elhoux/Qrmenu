import React from 'react';

interface IconBadgeProps {
  text: string;
  variant?: 'promo' | 'new' | 'hot';
  className?: string;
}

const IconBadge: React.FC<IconBadgeProps> = ({ text, variant = 'promo', className = '' }) => {
  const variantStyles = {
    promo: 'bg-primary text-white',
    new: 'bg-accent text-white',
    hot: 'bg-danger text-white',
  };

  return (
    <span className={`
      inline-block px-2 py-1 text-xs font-medium rounded-full
      ${variantStyles[variant]}
      ${className}
    `}>
      {text}
    </span>
  );
};

export default IconBadge;