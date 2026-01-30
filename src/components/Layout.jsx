import React, { useContext } from 'react';
import { LayoutDashboard, Wallet, Settings, LogOut } from 'lucide-react';
import { TransactionContext } from '../context/TransactionContext';

const Layout = ({ children }) => {
    const { currency, setCurrency } = useContext(TransactionContext);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navigation */}
            <nav className="glass-panel" style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                borderRadius: 0,
                borderLeft: 0,
                borderRight: 0,
                borderTop: 0
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, var(--primary), #818cf8)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Wallet size={24} color="white" />
                        </div>
                        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>SmartTracker</h1>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                style={{
                                    appearance: 'none',
                                    background: 'var(--glass-bg)',
                                    border: '1px solid var(--glass-border)',
                                    color: 'var(--text-secondary)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    paddingRight: '1.5rem',
                                    outline: 'none'
                                }}
                            >
                                <option value="$">USD ($)</option>
                                <option value="€">EUR (€)</option>
                                <option value="£">GBP (£)</option>
                                <option value="₹">INR (₹)</option>
                            </select>
                            <Settings size={14} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container" style={{ flex: 1, marginTop: '2rem', paddingBottom: '4rem' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
