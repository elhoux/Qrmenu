import React from 'react';

interface SectionHeaderProps {
  title: string;
  showSeeAll?: boolean;
  onSeeAllClick?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  showSeeAll = true, 
  onSeeAllClick 
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      {showSeeAll && (
        <button
          onClick={onSeeAllClick}
          className="text-primary text-sm font-medium hover:text-primary-600 transition-colors"
        >
          See All
        </button>
      )}
    </div>
  );
};

export default SectionHeader;