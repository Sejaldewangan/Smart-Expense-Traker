import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatters';
import ExpenseForm from './ExpenseForm';
import TransactionList from './TransactionList';
import AnalyticsCharts from './AnalyticsCharts';
import { Card } from './UIComponents';
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';

const Dashboard = () => {
    const { transactions, currency } = useContext(TransactionContext);

    const amounts = transactions.map(transaction => transaction.type === 'income' ? +transaction.amount : -transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0);

    const income = transactions
        .filter(item => item.type === 'income')
        .reduce((acc, item) => (acc += Number(item.amount)), 0);

    const expense = transactions
        .filter(item => item.type === 'expense')
        .reduce((acc, item) => (acc += Number(item.amount)), 0);

    return (
        <div className="grid-dashboard animate-fade-in">
            {/* Left Column: Form & Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Balance Card */}
                <div style={{
                    background: 'linear-gradient(135deg, var(--primary), #818cf8)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    color: 'white',
                    boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', opacity: 0.9 }}>
                        <DollarSign size={20} />
                        <span style={{ fontWeight: 500 }}>Total Balance</span>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.1)', color: 'white', background: 'none', WebkitTextFillColor: 'initial' }}>
                        {formatCurrency(total, currency)}
                    </h1>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                <ArrowUpCircle size={16} />
                                <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>Income</span>
                            </div>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatCurrency(income, currency)}</span>
                        </div>
                        <div style={{ flex: 1, background: 'rgba(0,0,0,0.15)', padding: '1rem', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                <ArrowDownCircle size={16} />
                                <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>Expenses</span>
                            </div>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatCurrency(expense, currency)}</span>
                        </div>
                    </div>
                </div>

                <ExpenseForm />
            </div>

            {/* Right Column: Analytics & List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <AnalyticsCharts />
                <TransactionList />
            </div>
        </div>
    );
};

export default Dashboard;
