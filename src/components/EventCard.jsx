import React from 'react';

const EventCard = ({ image, title, description, date, buttonLabel, layout = 'vertical', onButtonClick }) => {
  if (layout === 'horizontal') {
    return (
      <div className="flex items-center gap-6 bg-white rounded-lg shadow-md p-4 w-full max-w-2xl">
        <img src={image} alt={title} className="w-40 h-24 object-cover rounded" />
        <div>
          {date && <div className="text-xs text-brand-primary font-semibold mb-1">{date}</div>}
          <div className="text-lg font-bold text-brand-text-primary">{title}</div>
          <div className="text-sm text-brand-text-secondary mb-2">{description}</div>
          {buttonLabel && (
            <button
              className="bg-brand-primary text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-red-500 transition-colors"
              onClick={onButtonClick}
            >
              {buttonLabel}
            </button>
          )}
        </div>
      </div>
    );
  }
  // Default: vertical card
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md w-56">
      <img src={image} alt={title} className="w-full h-32 object-cover" />
      <div className="p-3">
        <h3 className="font-bold text-md text-brand-text-primary">{title}</h3>
        <p className="text-xs text-brand-text-secondary">{description}</p>
      </div>
    </div>
  );
};

export default EventCard; 