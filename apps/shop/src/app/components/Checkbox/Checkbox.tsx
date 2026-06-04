interface CheckboxProps {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  children?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  className,
  children,
}) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-base">
      <input
        className={`w-5 h-5 gap cursor-pointer ${className}`}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {children}
    </label>
  );
};
