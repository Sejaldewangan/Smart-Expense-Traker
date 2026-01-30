import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { TransactionProvider } from './context/TransactionContext';
import { Toaster } from 'sonner';
import LoadingScreen from './components/LoadingScreen';

function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isFadeOut, setIsFadeOut] = React.useState(false);
    const [activeView, setActiveView] = React.useState('dashboard');

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsFadeOut(true);
            setTimeout(() => setIsLoading(false), 800); // Match transition duration
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard />;
            case 'transactions':
                return (
                    <div className="animate-fade-in">
                        <h2 style={{ marginBottom: '1.5rem' }}>Transaction History</h2>
                        <Dashboard /> {/* For now, we reuse parts or show the same, but could be filter-focused */}
                    </div>
                );
            case 'analytics':
                return (
                    <div className="animate-fade-in">
                        <h2 style={{ marginBottom: '1.5rem' }}>Analytics Overview</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                            <Dashboard /> {/* Just for visual density demo */}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="animate-fade-in" style={{ textAlign: 'center', padding: '5rem' }}>
                        <h2>{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>This section is coming soon!</p>
                    </div>
                );
        }
    };

    return (
        <TransactionProvider>
            {isLoading && <LoadingScreen isFadeOut={isFadeOut} />}
            <Toaster position="top-right" richColors />
            <Layout activeView={activeView} setActiveView={setActiveView}>
                {renderView()}
            </Layout>
        </TransactionProvider>
    );
}

export default App;
