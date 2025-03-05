import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export const LoadingPage: React.FC = () => {
  return (
    <div className={`w-full h-full bg-gray-200 absolute top-0 left-0 z-20`}>
      <LoadingSpinner />
    </div>
  );
};
