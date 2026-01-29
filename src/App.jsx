import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { TransactionProvider } from './context/TransactionContext';

function App() {
    return (
        <TransactionProvider>
            <Layout>
                <Dashboard />
            </Layout>
        </TransactionProvider>
    );
}

export default App;
