import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Card } from './UIComponents';
import { formatCurrency } from '../utils/formatters';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

const BudgetProgress = () => {
    const { transactions, currency, budget } = useContext(TransactionContext);

    // Use budget from context
    const monthlyBudget = budget;
    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + Number(t.amount), 0);

    const percentage = Math.min((totalExpenses / monthlyBudget) * 100, 100);
    const remaining = monthlyBudget - totalExpenses;

    const getBarColorClass = () => {
        if (percentage >= 90) return 'bg-rose-500';
        if (percentage >= 70) return 'bg-amber-500';
        return 'bg-emerald-500';
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Monthly Budget</h3>
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    {percentage.toFixed(0)}% used
                </span>
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-end mb-3">
                    <span className="text-2xl font-bold tracking-tight">{formatCurrency(totalExpenses, currency)}</span>
                    <span className="text-sm text-muted-foreground pb-1">of {formatCurrency(monthlyBudget, currency)}</span>
                </div>

                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn("h-full rounded-full shadow-sm", getBarColorClass())}
                    />
                </div>
            </div>

            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex justify-between items-center">
                <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-0.5">Remaining</p>
                    <p className={cn("text-lg font-bold", remaining >= 0 ? 'text-emerald-500' : 'text-rose-500')}>
                        {formatCurrency(remaining, currency)}
                    </p>
                </div>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors">
                    Adjust
                </button>
            </div>
        </Card>
    );
};

export default BudgetProgress;
