import React, { useContext, useState, useMemo } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatters';
import { Card, Button, Input, Select } from './UIComponents';
import {
    Trash2, TrendingUp, TrendingDown, Search, Filter,
    CheckSquare, Square, XCircle, Utensils, Car, Zap,
    Play, ShoppingBag, HeartPulse, Package, Wallet,
    Briefcase, MoreHorizontal, Inbox, Edit2, X, Download
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
    const { transactions, deleteTransaction, deleteMultipleTransactions, updateTransaction, currency } = useContext(TransactionContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [selectedIds, setSelectedIds] = useState([]);

    // Edit State
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [editText, setEditText] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editType, setEditType] = useState('expense');

    const exportToCSV = () => {
        if (transactions.length === 0) return;

        const headers = ['Date', 'Description', 'Amount', 'Type', 'Category'];
        const csvContent = [
            headers.join(','),
            ...transactions.map(t => [
                new Date(t.date).toLocaleDateString(),
                `"${t.text.replace(/"/g, '""')}"`,
                t.amount,
                t.type,
                t.category
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Transactions exported to CSV');
    };

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

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction);
        setEditText(transaction.text);
        setEditAmount(transaction.amount);
        setEditCategory(transaction.category);
        setEditType(transaction.type);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updated = {
            ...editingTransaction,
            text: editText,
            amount: +editAmount,
            category: editCategory,
            type: editType
        };
        updateTransaction(updated);
        toast.success('Transaction updated!');
        setEditingTransaction(null);
    };

    if (transactions.length === 0) {
        return (
            <Card className="animate-fade-in" style={{ position: 'relative' }}>
                <div className="card-header" style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0 }}>History</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="glass-panel" style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div className="skeleton" style={{ width: '18px', height: '18px' }}></div>
                                <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '12px' }}></div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div className="skeleton" style={{ width: '120px', height: '1rem' }}></div>
                                    <div className="skeleton" style={{ width: '80px', height: '0.75rem' }}></div>
                                </div>
                            </div>
                            <div className="skeleton" style={{ width: '60px', height: '1.25rem' }}></div>
                        </div>
                    ))}
                </div>

                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(15, 23, 42, 0.4)',
                    backdropFilter: 'blur(1px)',
                    borderRadius: 'var(--radius-lg)',
                    zIndex: 10
                }}>
                    <Inbox size={48} style={{ color: 'var(--primary)', marginBottom: '1rem', opacity: 0.8 }} />
                    <h3 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>No data yet</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your transactions will appear here</p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="animate-fade-in" style={{ position: 'relative' }}>
            {/* Edit Modal Overlay */}
            {editingTransaction && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }}>
                    <Card style={{ maxWidth: '450px', width: '100%', position: 'relative' }}>
                        <button
                            onClick={() => setEditingTransaction(null)}
                            style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        >
                            <X size={24} />
                        </button>
                        <h2 style={{ marginBottom: '2rem' }}>Edit Transaction</h2>
                        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Description</label>
                                <Input value={editText} onChange={(e) => setEditText(e.target.value)} required />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Amount</label>
                                    <Input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} required />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Type</label>
                                    <Select value={editType} onChange={(e) => setEditType(e.target.value)}>
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Category</label>
                                <Select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Health">Health</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Investment">Investment</option>
                                    <option value="Other">Other</option>
                                </Select>
                            </div>
                            <Button type="submit" variant="primary" style={{ marginTop: '1rem', width: '100%' }}>
                                Update Transaction
                            </Button>
                        </form>
                    </Card>
                </div>
            )}

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
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Button
                                variant="ghost"
                                onClick={exportToCSV}
                                style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                                title="Export to CSV"
                            >
                                <Download size={14} />
                                <span>Export</span>
                            </Button>
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

            <div className="custom-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
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

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    marginRight: '0.5rem',
                                    color: transaction.type === 'income' ? 'var(--success)' : 'var(--text-primary)'
                                }}>
                                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount, currency)}
                                </span>
                                <div style={{ display: 'flex', gap: '0.25rem' }}>
                                    <Button
                                        variant="ghost"
                                        onClick={(e) => { e.stopPropagation(); handleEditClick(transaction); }}
                                        style={{ padding: '0.4rem' }}
                                    >
                                        <Edit2 size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={(e) => { e.stopPropagation(); handleDelete(transaction.id); }}
                                        style={{ padding: '0.4rem' }}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};

export default TransactionList;
