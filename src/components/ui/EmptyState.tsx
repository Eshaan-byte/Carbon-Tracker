import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  icon?: string; // Can be an emoji or a path to an SVG
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow-md">
      {icon && (
        <div className="mb-4 text-6xl">
          {icon.startsWith('<svg') ? (
            <div dangerouslySetInnerHTML={{ __html: icon }} />
          ) : (
            <span role="img" aria-label="icon">{icon}</span>
          )}
        </div>
      )}
      <h2 className="mb-2 text-2xl font-semibold text-green-700">{title}</h2>
      <p className="mb-4 text-gray-600">{description}</p>
      <button
        onClick={onAction}
        className="px-6 py-3 text-white bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
      >
        {actionLabel}
      </button>
    </div>
  );
};

export default EmptyState;
