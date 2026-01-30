import React, { useContext, useState, useMemo } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatters';
import { Card, Button, Input } from './UIComponents';
import {
    Trash2, TrendingUp, TrendingDown, Search, Filter,
    CheckSquare, Square, XCircle, Utensils, Car, Zap,
    Play, ShoppingBag, HeartPulse, Package, Wallet,
    Briefcase, MoreHorizontal, Inbox
} from 'lucide-react';
import { toast } from 'sonner';

const getCategoryIcon = (category) => {
    switch (category) {
        case 'Food': return <Utensils size={16} />;
        case 'Transport': return <Car size={16} />;
        case 'Utilities': return <Zap size={16} />;
        case 'Entertainment': return <Play size={16} />;
        case 'Shopping': return <ShoppingBag size={16} />;
        case 'Health': return <HeartPulse size={16} />;
        case 'Salary': return <Wallet size={16} />;
        case 'Freelance': return <Briefcase size={16} />;
        case 'Investment': return <TrendingUp size={16} />;
        case 'Other': return <MoreHorizontal size={16} />;
        default: return <Package size={16} />;
    }
};

const TransactionList = () => {
    const { transactions, deleteTransaction, deleteMultipleTransactions, currency } = useContext(TransactionContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [selectedIds, setSelectedIds] = useState([]);

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const matchesSearch = t.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterType === 'all' || t.type === filterType;
            return matchesSearch && matchesFilter;
        });
    }, [transactions, searchTerm, filterType]);

    const toggleSelection = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;
        deleteMultipleTransactions(selectedIds);
        toast.success(`Deleted ${selectedIds.length} transactions`);
        setSelectedIds([]);
    };

    const handleDelete = (id) => {
        deleteTransaction(id);
        toast.success('Transaction deleted');
    };

    if (transactions.length === 0) {
        return (
            <Card className="animate-fade-in">
                <div style={{
                    textAlign: 'center',
                    padding: '3rem 1rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'var(--glass-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        opacity: 0.5
                    }}>
                        <Inbox size={40} />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>No transactions yet</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>Start tracking your expenses by adding one above!</p>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="animate-fade-in">
            <div className="card-header" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>
                    <h3 style={{ margin: 0 }}>History</h3>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {selectedIds.length > 0 && (
                            <Button
                                variant="danger"
                                onClick={handleBulkDelete}
                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                            >
                                <Trash2 size={14} />
                                Delete ({selectedIds.length})
                            </Button>
                        )}
                        <div style={{ display: 'flex', background: 'var(--glass-bg)', borderRadius: '8px', padding: '2px' }}>
                            {['all', 'income', 'expense'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    style={{
                                        padding: '4px 12px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: filterType === type ? 'var(--primary)' : 'transparent',
                                        color: filterType === type ? 'white' : 'var(--text-secondary)',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingLeft: '40px', marginBottom: 0 }}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeght: '500px', overflowY: 'auto', paddingRight: '4px' }}>
                {filteredTransactions.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        <Search size={32} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                        <p>No results found for "{searchTerm}"</p>
                    </div>
                ) : (
                    filteredTransactions.map(transaction => (
                        <div key={transaction.id} className="glass-panel" style={{
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderLeft: `4px solid ${transaction.type === 'income' ? 'var(--success)' : 'var(--danger)'}`,
                            transition: 'transform 0.2s, background 0.2s',
                            cursor: 'pointer'
                        }} onClick={() => toggleSelection(transaction.id)}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div onClick={(e) => { e.stopPropagation(); toggleSelection(transaction.id); }} style={{ color: selectedIds.includes(transaction.id) ? 'var(--primary)' : 'var(--text-secondary)', cursor: 'pointer' }}>
                                    {selectedIds.includes(transaction.id) ? <CheckSquare size={18} /> : <Square size={18} />}
                                </div>
                                <div style={{
                                    padding: '10px',
                                    borderRadius: '12px',
                                    background: transaction.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: transaction.type === 'income' ? 'var(--success)' : 'var(--danger)',
                                    display: 'flex'
                                }}>
                                    {getCategoryIcon(transaction.category)}
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{transaction.text}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{transaction.category}</span>
                                        <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--text-secondary)', opacity: 0.5 }}></span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{new Date(transaction.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    color: transaction.type === 'income' ? 'var(--success)' : 'var(--text-primary)'
                                }}>
                                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount, currency)}
                                </span>
                                <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(transaction.id); }} style={{ padding: '0.4rem', background: 'transparent', color: 'var(--text-secondary)' }}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};

export default TransactionList;
