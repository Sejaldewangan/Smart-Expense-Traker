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

import { motion } from 'framer-motion';

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
        <aside className="hidden lg:flex sidebar w-72 flex-col gap-8 p-8 border-r border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 h-screen">
            <div
                className="flex items-center gap-3 mb-4 cursor-pointer group"
                onClick={() => setActiveView('dashboard')}
            >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                    <Wallet size={22} className="text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    SmartTracker
                </h1>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors group ${activeView === item.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {activeView === item.id && (
                            <motion.div
                                layoutId="activeNav"
                                className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10 transition-transform group-hover:scale-110">
                            {item.icon}
                        </span>
                        <span className="relative z-10">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="flex flex-col gap-1 pt-6 border-t border-border/50">
                {secondaryItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors group ${activeView === item.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {activeView === item.id && (
                            <motion.div
                                layoutId="activeNavSecondary"
                                className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10 transition-transform group-hover:scale-110">
                            {item.icon}
                        </span>
                        <span className="relative z-10">{item.label}</span>
                    </button>
                ))}

                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-all hover:bg-white/5 mt-2 group"
                >
                    <span className="transition-transform group-hover:rotate-12">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </span>
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
