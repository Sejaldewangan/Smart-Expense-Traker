import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '' }) => {
    return (
        <div className={cn(
            "bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2rem] p-6 lg:p-8 shadow-2xl shadow-black/10",
            className
        )}>
            {children}
        </div>
    );
};

export const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '', ...props }) => {
    const variants = {
        primary: 'bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20',
        danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/50',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground'
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            type={type}
            onClick={onClick}
            className={cn(
                "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export const Input = ({ className = '', ...props }) => {
    return (
        <input
            className={cn(
                "flex h-12 w-11/12 lg:w-full rounded-xl border border-border/50 bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
                className
            )}
            {...props}
        />
    );
};

export const Select = ({ children, className = '', ...props }) => {
    return (
        <select
            className={cn(
                "flex h-12 w-full rounded-xl border border-border/50 bg-background/50 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all cursor-pointer appearance-none",
                className
            )}
            {...props}
        >
            {children}
        </select>
    );
};
