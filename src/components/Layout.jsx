import React, { useContext } from 'react';
import { LayoutDashboard, Wallet, Settings, LogOut } from 'lucide-react';
import { TransactionContext } from '../context/TransactionContext';

import Sidebar from './Sidebar';

const Layout = ({ children, activeView, setActiveView }) => {
    const { currency, setCurrency } = useContext(TransactionContext);

    return (
        <div className="app-layout">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', overflowX: 'hidden' }}>
                <nav className="glass-panel" style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    borderRadius: 0,
                    borderLeft: 0,
                    borderRight: 0,
                    borderTop: 0,
                    marginBottom: '1rem'
                }}>
                    <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '1rem 2rem' }}>
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
                                <Settings size={14} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }} />
                            </div>

                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--glass-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>JD</span>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
