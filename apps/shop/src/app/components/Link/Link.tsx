export interface LinkProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary';
}

export const Link: React.FC<LinkProps> = ({
  href,
  variant = 'primary',
  children,
}) => {
  return (
    <a
      href={href}
      className={`
        bg-none border-none
         text-base cursor-pointer
        transition-colors duration-300 hover:underline
        ${variant === 'primary' ? 'text-blue-500 hover:text-blue-700' : 'text-white'}
        `}
    >
      {children}
    </a>
  );
};
