import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ id, image, title, description, date, buttonLabel, layout = 'vertical', onButtonClick }) => {
  const cardContent = layout === 'horizontal' ? (
    <div className="flex items-center gap-6 bg-white rounded-lg shadow-md p-4 w-full max-w-2xl h-32 transition-transform hover:scale-[1.02] cursor-pointer">
      <img src={image} alt={title} className="w-40 h-24 object-cover rounded" />
      <div className="flex-1 min-w-0">
        {date && <div className="text-xs text-brand-primary font-semibold mb-1">{date}</div>}
        <div className="text-lg font-bold text-brand-text-primary truncate">{title}</div>
        <div className="text-sm text-brand-text-secondary mb-2 truncate">{description}</div>
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
  ) : (
    <div className="bg-white rounded-lg overflow-hidden shadow-md w-56 h-64 flex flex-col transition-transform hover:scale-105 cursor-pointer">
      <img src={image} alt={title} className="w-full h-32 object-cover" />
      <div className="p-3 flex-1 flex flex-col justify-between">
        <h3 className="font-bold text-md text-brand-text-primary truncate">{title}</h3>
        <p className="text-xs text-brand-text-secondary truncate">{description}</p>
      </div>
    </div>
  );

  return id ? (
    <Link to={`/event/${id}`}>{cardContent}</Link>
  ) : cardContent;
};

export default EventCard; 