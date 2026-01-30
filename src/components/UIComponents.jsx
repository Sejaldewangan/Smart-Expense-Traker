import React from 'react';

export const Card = ({ children, className = '' }) => {
    return (
        <div className={`glass-panel p-6 ${className}`} style={{ padding: '1.5rem' }}>
            {children}
        </div>
    );
};

export const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '' }) => {
    const variantClasses = {
        primary: 'btn-primary',
        danger: 'btn-danger',
        secondary: 'btn-secondary',
        ghost: 'btn-ghost'
    };
    const baseClass = variantClasses[variant] || 'btn-primary';
    return (
        <button type={type} onClick={onClick} className={`${baseClass} ${className}`}>
            {children}
        </button>
    );
};

export const Input = ({ label, ...props }) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            {label && <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{label}</label>}
            <input className="glass-input" {...props} />
        </div>
    );
};

export const Select = ({ label, options, children, ...props }) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            {label && <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{label}</label>}
            <select className="glass-input transition-all" {...props}>
                {children}
                {!children && options && options.map(opt => (
                    <option key={opt.value} value={opt.value} style={{ background: 'var(--bg-card)', color: 'white' }}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
