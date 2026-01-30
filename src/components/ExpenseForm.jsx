import React, { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Card, Button, Input, Select } from './UIComponents';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

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
        <Card className="animate-fade-in">
            <div className="card-header">
                <h3>Add New Transaction</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <Button
                        onClick={() => setType('expense')}
                        variant={type === 'expense' ? 'primary' : 'danger'} // Creative use of variant for toggle state visual
                        className={type !== 'expense' ? 'opacity-50' : ''}
                        style={{ flex: 1, opacity: type === 'expense' ? 1 : 0.5 }}
                    >
                        Expense
                    </Button>
                    <Button
                        onClick={() => setType('income')}
                        variant={type === 'income' ? 'primary' : 'danger'}
                        style={{ flex: 1, backgroundColor: type === 'income' ? 'var(--success)' : '', opacity: type === 'income' ? 1 : 0.5 }}
                    >
                        Income
                    </Button>
                </div>

                <Input
                    label="Description"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What was this for?"
                />

                <Input
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                />

                <Select
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={type === 'expense' ? expenseCategories : incomeCategories}
                />

                <Button type="submit" style={{ width: '100%', marginTop: '0.5rem' }}>
                    <PlusCircle size={18} />
                    Add Transaction
                </Button>
            </form>
        </Card>
    );
};

export default ExpenseForm;
