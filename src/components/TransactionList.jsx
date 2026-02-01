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

import { motion, AnimatePresence } from 'framer-motion';

const listVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
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
            <Card className="relative overflow-hidden min-h-[400px]">
                <div className="card-header pb-4 border-b border-border/50">
                    <h3 className="text-lg font-bold">History</h3>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="glass-panel p-4 flex justify-between items-center opacity-30">
                            <div className="flex items-center gap-4">
                                <div className="skeleton w-5 h-5"></div>
                                <div className="skeleton w-10 h-10 rounded-xl"></div>
                                <div className="space-y-2">
                                    <div className="skeleton w-32 h-4"></div>
                                    <div className="skeleton w-20 h-3"></div>
                                </div>
                            </div>
                            <div className="skeleton w-16 h-6"></div>
                        </div>
                    ))}
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-[2px] z-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 15 }}
                    >
                        <Inbox size={64} className="text-primary/40 mb-4 mx-auto" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-1">No data yet</h3>
                    <p className="text-muted-foreground">Your transactions will appear here</p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="relative">
            {/* Edit Modal Overlay */}
            <AnimatePresence>
                {editingTransaction && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            <Card className="max-w-md w-full relative">
                                <button
                                    onClick={() => setEditingTransaction(null)}
                                    className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <h2 className="text-xl font-bold mb-6">Edit Transaction</h2>
                                <form onSubmit={handleUpdate} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Description</label>
                                        <Input value={editText} onChange={(e) => setEditText(e.target.value)} required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">Amount</label>
                                            <Input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">Type</label>
                                            <Select value={editType} onChange={(e) => setEditType(e.target.value)}>
                                                <option value="expense">Expense</option>
                                                <option value="income">Income</option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Category</label>
                                        <Select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                                            {['Food', 'Transport', 'Shopping', 'Entertainment', 'Utilities', 'Health', 'Salary', 'Freelance', 'Investment', 'Other'].map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <Button type="submit" variant="primary" className="w-full mt-2">
                                        Update Transaction
                                    </Button>
                                </form>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="card-header items-start lg:items-center flex-col lg:flex-row gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold m-0">History</h3>
                    <div className="flex bg-muted rounded-lg p-1">
                        {['all', 'income', 'expense'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${filterType === type
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                    } capitalize`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full lg:w-auto">
                    {selectedIds.length > 0 && (
                        <Button
                            variant="danger"
                            onClick={handleBulkDelete}
                            className="h-9 px-3 text-xs"
                        >
                            <Trash2 size={14} className="mr-2" />
                            Delete ({selectedIds.length})
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        onClick={exportToCSV}
                        className="h-9 px-3 text-xs flex items-center gap-2"
                        title="Export to CSV"
                    >
                        <Download size={14} />
                        <span className="hidden sm:inline">Export</span>
                    </Button>
                    <div className="relative flex-1 lg:flex-none lg:w-64">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-9 mb-0"
                        />
                    </div>
                </div>
            </div>

            <div className="custom-scrollbar max-h-[500px] overflow-y-auto pr-2">
                {filteredTransactions.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Search size={40} className="mx-auto opacity-20 mb-3" strokeWidth={1.5} />
                            <p className="text-sm">No results found for "{searchTerm}"</p>
                        </motion.div>
                    </div>
                ) : (
                    <motion.div
                        variants={listVariants}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col gap-3"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredTransactions.map(transaction => (
                                <motion.div
                                    key={transaction.id}
                                    variants={itemVariants}
                                    layout
                                    exit="exit"
                                    className={`glass-panel p-3 lg:p-4 flex justify-between items-center group cursor-pointer transition-colors border-l-4 ${transaction.type === 'income' ? 'border-emerald-500' : 'border-rose-500'
                                        } ${selectedIds.includes(transaction.id) ? 'bg-primary/5 border-primary' : 'hover:bg-white/5'}`}
                                    onClick={() => toggleSelection(transaction.id)}
                                >
                                    <div className="flex items-center gap-3 lg:gap-4 overflow-hidden">
                                        <div
                                            onClick={(e) => { e.stopPropagation(); toggleSelection(transaction.id); }}
                                            className={`transition-colors shrink-0 ${selectedIds.includes(transaction.id) ? 'text-primary' : 'text-muted-foreground'}`}
                                        >
                                            {selectedIds.includes(transaction.id) ? <CheckSquare size={18} /> : <Square size={18} />}
                                        </div>
                                        <div className={`p-2.5 rounded-xl shrink-0 flex items-center justify-center ${transaction.type === 'income'
                                            ? 'bg-emerald-500/10 text-emerald-500'
                                            : 'bg-rose-500/10 text-rose-500'
                                            }`}>
                                            {getCategoryIcon(transaction.category)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="m-0 text-sm font-medium truncate">{transaction.text}</h4>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] lg:text-xs text-muted-foreground font-medium uppercase tracking-wider">{transaction.category}</span>
                                                <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                                                <span className="text-[10px] lg:text-xs text-muted-foreground whitespace-nowrap">
                                                    {new Date(transaction.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                                        <span className={`text-sm lg:text-base font-bold tabular-nums ${transaction.type === 'income' ? 'text-emerald-500' : 'text-foreground'
                                            }`}>
                                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount, currency)}
                                        </span>
                                        <div className="flex gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                onClick={(e) => { e.stopPropagation(); handleEditClick(transaction); }}
                                                className="p-1 h-7 w-7 rounded-lg hover:bg-background"
                                            >
                                                <Edit2 size={12} className="text-sky-400" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={(e) => { e.stopPropagation(); handleDelete(transaction.id); }}
                                                className="p-1 h-7 w-7 rounded-lg hover:bg-rose-500/10"
                                            >
                                                <Trash2 size={12} className="text-rose-400" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </Card>
    );
};

export default TransactionList;
