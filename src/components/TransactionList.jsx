import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatters';
import { Card, Button } from './UIComponents';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';

const TransactionList = () => {
    const { transactions, deleteTransaction } = useContext(TransactionContext);

    if (transactions.length === 0) {
        return (
            <Card>
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '1rem' }}>
                    No recent transactions.
                </div>
            </Card>
        );
    }

    return (
        <Card className="animate-fade-in">
            <div className="card-header">
                <h3>History</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {transactions.map(transaction => (
                    <div key={transaction.id} className="glass-panel" style={{
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderLeft: `4px solid ${transaction.type === 'income' ? 'var(--success)' : 'var(--danger)'}`
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                padding: '8px',
                                borderRadius: '50%',
                                background: transaction.type === 'income' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                display: 'flex'
                            }}>
                                {transaction.type === 'income' ? <TrendingUp size={16} color="var(--success)" /> : <TrendingDown size={16} color="var(--danger)" />}
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>{transaction.text}</h4>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{transaction.category}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{
                                fontWeight: 'bold',
                                color: transaction.type === 'income' ? 'var(--success)' : 'var(--text-primary)'
                            }}>
                                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                            </span>
                            <Button variant="danger" onClick={() => deleteTransaction(transaction.id)} style={{ padding: '0.4rem' }}>
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default TransactionList;
