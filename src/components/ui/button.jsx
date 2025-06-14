import React from 'react';

export const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 ${className}`}
    >
      {children}
    </button>
  );
};
