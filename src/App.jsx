import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { TransactionProvider } from './context/TransactionContext';

import { Toaster } from 'sonner';

function App() {
    return (
        <TransactionProvider>
            <Toaster position="top-right" richColors />
            <Layout>
                <Dashboard />
            </Layout>
        </TransactionProvider>
    );
}

export default App;
