import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { TransactionProvider } from './context/TransactionContext';
import { Toaster } from 'sonner';
import LoadingScreen from './components/LoadingScreen';
import AnalyticsView from './components/AnalyticsView';
import Settings from './components/Settings';
import TransactionList from './components/TransactionList';
import Help from './components/Help';

import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isFadeOut, setIsFadeOut] = React.useState(false);
    const [activeView, setActiveView] = React.useState('dashboard');

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsFadeOut(true);
            setTimeout(() => setIsLoading(false), 800);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const pageVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
    };

    const renderView = () => {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeView}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {(() => {
                        switch (activeView) {
                            case 'dashboard':
                                return <Dashboard />;
                            case 'transactions':
                                return (
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-2xl font-bold tracking-tight">Transaction History</h2>
                                            <p className="text-muted-foreground">View and manage all your financial records</p>
                                        </div>
                                        <TransactionList />
                                    </div>
                                );
                            case 'analytics':
                                return <AnalyticsView />;
                            case 'settings':
                                return <Settings />;
                            case 'help':
                                return <Help />;
                            default:
                                return (
                                    <div className="text-center py-20">
                                        <h2 className="text-2xl font-bold">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h2>
                                        <p className="text-muted-foreground">This section is coming soon!</p>
                                    </div>
                                );
                        }
                    })()}
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <TransactionProvider>
            {isLoading && <LoadingScreen isFadeOut={isFadeOut} />}
            <Toaster position="top-right" richColors />
            <Layout activeView={activeView} setActiveView={setActiveView}>
                <div className="container mx-auto max-w-7xl">
                    {renderView()}
                </div>
            </Layout>
        </TransactionProvider>
    );
}

export default App;
