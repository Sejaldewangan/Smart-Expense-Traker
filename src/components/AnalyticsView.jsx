import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import AnalyticsCharts from './AnalyticsCharts';
import { Card } from './UIComponents';
import { formatCurrency } from '../utils/formatters';
import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';
import { cn } from '../utils/cn';

const AnalyticsView = () => {
    const { transactions, currency, budget } = useContext(TransactionContext);

    const expenses = transactions.filter(t => t.type === 'expense');
    const income = transactions.filter(t => t.type === 'income');

    const totalExpenses = expenses.reduce((acc, t) => acc + Number(t.amount), 0);
    const totalIncome = income.reduce((acc, t) => acc + Number(t.amount), 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    const stats = [
        { label: 'Avg. Daily Expense', value: (totalExpenses / 30).toFixed(2), icon: <Zap size={18} />, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
        { label: 'Savings Rate', value: `${savingsRate.toFixed(1)}%`, icon: <TrendingUp size={18} />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Budget Utilization', value: `${((totalExpenses / budget) * 100).toFixed(1)}%`, icon: <Target size={18} />, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Net Income', value: (totalIncome - totalExpenses).toFixed(2), icon: <TrendingDown size={18} />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    ];

    return (
        <div className="flex flex-col gap-10">
            <header className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold tracking-tight">Financial Analytics</h2>
                <p className="text-muted-foreground">Deep dive into your financial habits and trends.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="flex items-center gap-4 p-5 lg:p-6 transition-transform hover:scale-[1.02] duration-300">
                        <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">
                                {stat.label}
                            </p>
                            <h3 className="text-xl font-bold tracking-tight">
                                {stat.label.includes('Rate') || stat.label.includes('Utilization')
                                    ? stat.value
                                    : formatCurrency(stat.value, currency)}
                            </h3>
                        </div>
                    </Card>
                ))}
            </div>

            <AnalyticsCharts />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-xl font-bold mb-6">Top Spending Categories</h3>
                    <div className="space-y-4">
                        {Object.entries(
                            expenses.reduce((acc, t) => {
                                acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
                                return acc;
                            }, {})
                        )
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 5)
                            .map(([cat, val], idx) => {
                                const percentage = (val / totalExpenses) * 100;
                                return (
                                    <div key={cat} className="space-y-2">
                                        <div className="flex justify-between items-center text-sm font-medium">
                                            <span className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                {cat}
                                            </span>
                                            <span>{formatCurrency(val, currency)}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </Card>

                <Card className="flex flex-col h-full">
                    <h3 className="text-xl font-bold mb-6">Income vs Expense</h3>
                    <div className="flex-1 flex items-end justify-center gap-12 pb-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="group relative">
                                <div
                                    className="w-16 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform cursor-pointer"
                                    style={{ height: `${Math.max((totalIncome / (Math.max(totalIncome, totalExpenses) || 1)) * 180, 20)}px` }}
                                />
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold border border-border">
                                    {formatCurrency(totalIncome, currency)}
                                </div>
                            </div>
                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-tight">Income</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="group relative">
                                <div
                                    className="w-16 bg-gradient-to-t from-rose-500 to-rose-400 rounded-2xl shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform cursor-pointer"
                                    style={{ height: `${Math.max((totalExpenses / (Math.max(totalIncome, totalExpenses) || 1)) * 180, 20)}px` }}
                                />
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold border border-border">
                                    {formatCurrency(totalExpenses, currency)}
                                </div>
                            </div>
                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-tight">Expense</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AnalyticsView;
