import React, { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Card, Button, Input, Select } from './UIComponents';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../utils/cn';

const ExpenseForm = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('General');

    const { addTransaction } = useContext(TransactionContext);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!text || !amount) {
            toast.error('Please fill in all fields');
            return;
        }

        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text,
            amount: +amount,
            type,
            category,
            date: new Date().toISOString()
        };

        addTransaction(newTransaction);
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`);
        setText('');
        setAmount('');
    };

    const expenseCategories = [
        { value: 'Food', label: 'Food & Dining' },
        { value: 'Transport', label: 'Transportation' },
        { value: 'Utilities', label: 'Utilities' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Shopping', label: 'Shopping' },
        { value: 'Health', label: 'Health' },
        { value: 'General', label: 'General' }
    ];

    const incomeCategories = [
        { value: 'Salary', label: 'Salary' },
        { value: 'Freelance', label: 'Freelance' },
        { value: 'Investment', label: 'Investment' },
        { value: 'Other', label: 'Other' }
    ];

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">New Transaction</h3>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
                <div className="flex bg-muted rounded-xl p-1 gap-1">
                    <button
                        type="button"
                        onClick={() => setType('expense')}
                        className={cn(
                            "flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all",
                            type === 'expense'
                                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('income')}
                        className={cn(
                            "flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all",
                            type === 'income'
                                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Income
                    </button>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Description</label>
                    <Input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What was this for?"
                        className="mb-0"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Amount</label>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="mb-0"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Category</label>
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mb-0"
                        >
                            {(type === 'expense' ? expenseCategories : incomeCategories).map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </Select>
                    </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl text-base">
                    <PlusCircle size={18} className="mr-2" />
                    Add Transaction
                </Button>
            </form>
        </Card>
    );
};

export default ExpenseForm;
