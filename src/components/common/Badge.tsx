interface BadgeProps {
  variant?: 'new' | 'sale';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'new', children, className = '' }) => {
  const variants = {
    new: 'bg-primary-gold text-white',
    sale: 'bg-red-500 text-white'
  };
  const classes = [
    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-[10px]',
    variants[variant],
    className
  ].join(' ');

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;
