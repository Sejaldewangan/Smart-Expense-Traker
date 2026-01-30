import React from 'react';
import {
    LayoutDashboard,
    ArrowLeftRight,
    PieChart,
    Target,
    Settings,
    HelpCircle,
    Wallet
} from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
        { icon: <ArrowLeftRight size={20} />, label: 'Transactions' },
        { icon: <PieChart size={20} />, label: 'Analytics' },
        { icon: <Target size={20} />, label: 'Budgets' },
    ];

    const secondaryItems = [
        { icon: <Settings size={20} />, label: 'Settings' },
        { icon: <HelpCircle size={20} />, label: 'Help' },
    ];

    return (
        <aside className="sidebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, var(--primary), #818cf8)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px var(--primary-glow)'
                }}>
                    <Wallet size={24} color="white" />
                </div>
                <h1 style={{ fontSize: '1.25rem', margin: 0, letterSpacing: '-0.02em', background: 'none', WebkitTextFillColor: 'white' }}>
                    SmartTracker
                </h1>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            background: item.active ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                            color: item.active ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: item.active ? '600' : '400',
                            transition: 'all 0.2s'
                        }}
                        className="sidebar-item"
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </nav>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                {secondaryItems.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            color: 'var(--text-secondary)',
                            transition: 'all 0.2s'
                        }}
                        className="sidebar-item"
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
