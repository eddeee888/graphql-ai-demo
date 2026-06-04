interface LinkButtonProps {
  children: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className="
        bg-none border-none
        text-blue-500 text-base cursor-pointer
        p-2 mb-6
        transition-colors duration-300 hover:text-blue-700 hover:underline
      "
      onClick={onClick}
    >
      {children}
    </button>
  );
};
