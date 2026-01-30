import React, { useContext } from 'react';
import {
    LayoutDashboard,
    ArrowLeftRight,
    PieChart,
    Settings,
    HelpCircle,
    Wallet,
    Sun,
    Moon
} from 'lucide-react';
import { TransactionContext } from '../context/TransactionContext';

const Sidebar = ({ activeView, setActiveView }) => {
    const { theme, toggleTheme } = useContext(TransactionContext);
    const menuItems = [
        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { id: 'transactions', icon: <ArrowLeftRight size={20} />, label: 'Transactions' },
        { id: 'analytics', icon: <PieChart size={20} />, label: 'Analytics' },
    ];

    const secondaryItems = [
        { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
        { id: 'help', icon: <HelpCircle size={20} />, label: 'Help' },
    ];

    return (
        <aside className="sidebar">
            <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', cursor: 'pointer' }}
                onClick={() => setActiveView('dashboard')}
            >
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
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            background: activeView === item.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                            color: activeView === item.id ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: activeView === item.id ? '600' : '400',
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
                {secondaryItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            background: activeView === item.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                            color: activeView === item.id ? 'var(--primary)' : 'var(--text-secondary)',
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
