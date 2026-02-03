import { forwardRef } from 'react';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', onClick, type = 'button', disabled, href }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-display font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 min-h-[44px]';
    
    const variants = {
      primary: 'bg-accent text-white hover:bg-accent/90 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]',
      secondary: 'bg-dark text-white hover:bg-dark/90 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]',
      outline: 'border-2 border-dark text-dark hover:bg-dark hover:text-white active:scale-[0.98]',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };
    
    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
    
    if (href) {
      return (
        <Link href={href} className={classes} ref={ref as React.Ref<HTMLAnchorElement>}>
          {children}
        </Link>
      );
    }
    
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

