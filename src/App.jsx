import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { TransactionProvider } from './context/TransactionContext';
import { Toaster } from 'sonner';
import LoadingScreen from './components/LoadingScreen';

function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isFadeOut, setIsFadeOut] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsFadeOut(true);
            setTimeout(() => setIsLoading(false), 800); // Match transition duration
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <TransactionProvider>
            {isLoading && <LoadingScreen isFadeOut={isFadeOut} />}
            <Toaster position="top-right" richColors />
            <Layout>
                <Dashboard />
            </Layout>
        </TransactionProvider>
    );
}

export default App;
