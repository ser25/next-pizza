import React from 'react';

interface Props {
  className?: string;
  onClose?: () => void;
}

export const RegisterForm: React.FC<Props> = ({ className, onClose }) => {
  return <div className={className}></div>;
};
