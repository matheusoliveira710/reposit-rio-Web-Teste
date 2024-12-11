import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-center text-red-800 dark:text-red-200">
      <AlertCircle className="w-5 h-5 mr-2" />
      {message}
    </div>
  </div>
);