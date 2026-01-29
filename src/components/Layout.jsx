import React from 'react';
import { LayoutDashboard, Wallet, Settings, LogOut } from 'lucide-react';

const Layout = ({ children }) => {
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

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {/* Placeholder for future auth features */}
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#334155',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}>
                            <Settings size={18} color="#94a3b8" />
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
