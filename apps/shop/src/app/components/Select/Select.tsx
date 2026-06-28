interface SelectProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  children?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  className,
  children,
}) => {
  return (
    <select
      className={`
        py-2 px-4
        text-base
        border-2 outline-none hover:border-blue-300 active:border-blue-300 focus:border-blue-300
        rounded-md
        cursor-pointer
        ${className}`}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
};
