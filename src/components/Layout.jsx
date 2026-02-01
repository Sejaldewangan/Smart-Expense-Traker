import React, { useContext } from 'react';
import { LayoutDashboard, Wallet, Settings, LogOut } from 'lucide-react';
import { TransactionContext } from '../context/TransactionContext';
import { Select } from './UIComponents';

import Sidebar from './Sidebar';

const Layout = ({ children, activeView, setActiveView }) => {
    const { currency, setCurrency, theme } = useContext(TransactionContext);

    return (
        <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
            </div>

            <Sidebar activeView={activeView} setActiveView={setActiveView} />

            <div className="flex flex-col flex-1 w-full relative z-10">
                <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="lg:hidden flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Wallet size={18} className="text-white" />
                            </div>
                            <span className="font-bold tracking-tight">SmartTracker</span>
                        </div>

                        <div className="flex items-center gap-4 ml-auto">
                            <div className="relative">
                                <Select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="h-9 py-0 pl-3 pr-8 text-xs font-medium w-24 mb-0"
                                >
                                    <option value="$">USD ($)</option>
                                    <option value="€">EUR (€)</option>
                                    <option value="£">GBP (£)</option>
                                    <option value="₹">INR (₹)</option>
                                </Select>
                            </div>

                            <button className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 border border-white/20 shadow-lg shadow-indigo-500/20 flex items-center justify-center text-white text-xs font-bold hover:scale-105 transition-transform">
                                JD
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
