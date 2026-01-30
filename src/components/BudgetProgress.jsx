import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Card } from './UIComponents';
import { formatCurrency } from '../utils/formatters';

const BudgetProgress = () => {
    const { transactions, currency, budget } = useContext(TransactionContext);

    // Use budget from context
    const monthlyBudget = budget;
    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + Number(t.amount), 0);

    const percentage = Math.min((totalExpenses / monthlyBudget) * 100, 100);
    const remaining = monthlyBudget - totalExpenses;

    const getBarColor = () => {
        if (percentage >= 90) return 'danger';
        if (percentage >= 70) return 'warning';
        return 'success';
    };

    return (
        <Card className="animate-fade-in">
            <div className="card-header">
                <h3>Monthly Budget</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {percentage.toFixed(0)}% used
                </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{formatCurrency(totalExpenses, currency)}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>of {formatCurrency(monthlyBudget, currency)}</span>
                </div>

                <div className="progress-container">
                    <div
                        className={`progress-bar ${getBarColor()}`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>

            <div style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '1rem',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Remaining</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: remaining >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                        {formatCurrency(remaining, currency)}
                    </p>
                </div>
                <button style={{
                    background: 'var(--primary)',
                    border: 'none',
                    color: 'white',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                }}>
                    Adjust
                </button>
            </div>
        </Card>
    );
};

export default BudgetProgress;
