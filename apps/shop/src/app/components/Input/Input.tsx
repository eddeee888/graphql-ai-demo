interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  className,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
          w-full 
          py-3 px-4 
          text-base
          border-2 outline-none hover:border-blue-300 active:border-blue-300 focus:border-blue-300
          rounded-md 
          transition-colors duration-300 
          ${className}`}
    />
  );
};
