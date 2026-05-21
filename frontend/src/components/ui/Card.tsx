import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  variant?: 'white' | 'dark' | 'gray';
}

const Card = ({ 
  title, 
  children, 
  className = "", 
  headerAction,
  variant = 'white'
}: CardProps) => {
  const variants = {
    white: "bg-white border-gray-200 text-gray-900",
    dark: "bg-gray-900 border-gray-800 text-white",
    gray: "bg-gray-50 border-gray-200 text-gray-800"
  };

  return (
    <div className={`${variants[variant]} rounded-md shadow-sm border p-6 ${className}`}>
      {(title || headerAction) && (
        <div className="flex justify-between items-center mb-8">
          {title && (
            <h3 className={`text-lg font-semibold tracking-tight ${variant === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h3>
          )}
          {headerAction}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
