export const Button: React.FC<{
  children: string;
  type?: 'button' | 'reset' | 'submit';
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}> = ({
  children,
  type = 'button',
  variant = 'primary',
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      className={`
        py-2 px-4 
        ${disabled ? `bg-gray-400 cursor-not-allowed` : variant === 'primary' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-purple-500 hover:bg-purple-700'} 
        outline-offset-2
        rounded 
        text-white text-base 
        transition-colors duration-300 
        ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
