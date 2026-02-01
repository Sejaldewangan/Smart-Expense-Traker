import React from 'react';
import { LayoutDashboard, ArrowLeftRight, PieChart, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = ({ activeView, setActiveView }) => {
    const navItems = [
        { id: 'dashboard', icon: <LayoutDashboard size={24} />, label: 'Home' },
        { id: 'transactions', icon: <ArrowLeftRight size={24} />, label: 'Trans' },
        { id: 'analytics', icon: <PieChart size={24} />, label: 'Stats' },
        { id: 'settings', icon: <Settings size={24} />, label: 'Settings' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pointer-events-none">
            {/* Gradient Fade overlay */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

            <div className="pointer-events-auto relative px-6 pb-6 pt-2">
                <nav className="bg-card/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 rounded-2xl flex justify-between items-center p-2 relative overflow-hidden">
                    {/* Background blob for active item */}
                    <div className="absolute inset-0 bg-background/40 -z-10" />

                    {navItems.map((item) => {
                        const isActive = activeView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveView(item.id)}
                                className={`relative flex-1 flex flex-col items-center justify-center gap-1 py-3 px-1 rounded-xl transition-all duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="bottomNavActive"
                                        className="absolute inset-0 bg-primary/10 rounded-xl"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}

                                <span className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                                    {item.icon}
                                </span>
                                <span className={`text-[10px] font-medium relative z-10 transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 hidden'}`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default BottomNav;
