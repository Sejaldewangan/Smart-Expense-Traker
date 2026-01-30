import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import AnalyticsCharts from './AnalyticsCharts';
import { Card } from './UIComponents';
import { formatCurrency } from '../utils/formatters';
import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';

const AnalyticsView = () => {
    const { transactions, currency, budget } = useContext(TransactionContext);

    const expenses = transactions.filter(t => t.type === 'expense');
    const income = transactions.filter(t => t.type === 'income');

    const totalExpenses = expenses.reduce((acc, t) => acc + Number(t.amount), 0);
    const totalIncome = income.reduce((acc, t) => acc + Number(t.amount), 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    const stats = [
        { label: 'Avg. Daily Expense', value: (totalExpenses / 30).toFixed(2), icon: <Zap size={20} />, color: '#6366f1' },
        { label: 'Savings Rate', value: `${savingsRate.toFixed(1)}%`, icon: <TrendingUp size={20} />, color: '#10b981' },
        { label: 'Budget Utilization', value: `${((totalExpenses / budget) * 100).toFixed(1)}%`, icon: <Target size={20} />, color: '#f59e0b' },
        { label: 'Net Income', value: (totalIncome - totalExpenses).toFixed(2), icon: <TrendingDown size={20} />, color: '#3b82f6' },
    ];

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h2 style={{ marginBottom: '0.5rem' }}>Financial Analytics</h2>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Detailed breakdown of your spending habits</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {stats.map((stat, index) => (
                    <Card key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            background: `${stat.color}15`,
                            color: stat.color,
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {stat.label}
                            </p>
                            <h3 style={{ margin: 0 }}>
                                {stat.label.includes('Rate') || stat.label.includes('Utilization')
                                    ? stat.value
                                    : formatCurrency(stat.value, currency)}
                            </h3>
                        </div>
                    </Card>
                ))}
            </div>

            <AnalyticsCharts />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <Card>
                    <h3>Top Spending Categories</h3>
                    {/* Simplified categorical ranking */}
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {Object.entries(
                            expenses.reduce((acc, t) => {
                                acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
                                return acc;
                            }, {})
                        )
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 5)
                            .map(([cat, val], idx) => (
                                <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: `var(--primary)` }}></span>
                                        <span>{cat}</span>
                                    </div>
                                    <span style={{ fontWeight: 600 }}>{formatCurrency(val, currency)}</span>
                                </div>
                            ))}
                    </div>
                </Card>

                <Card>
                    <h3>Income vs Expense</h3>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '2rem', justifyContent: 'center', paddingBottom: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                                width: '60px',
                                height: `${Math.max((totalIncome / (totalIncome + totalExpenses)) * 150, 20)}px`,
                                background: 'var(--success)',
                                borderRadius: '8px 8px 0 0',
                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                            }}></div>
                            <span style={{ fontSize: '0.75rem' }}>Income</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                                width: '60px',
                                height: `${Math.max((totalExpenses / (totalIncome + totalExpenses)) * 150, 20)}px`,
                                background: 'var(--danger)',
                                borderRadius: '8px 8px 0 0',
                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                            }}></div>
                            <span style={{ fontSize: '0.75rem' }}>Expense</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AnalyticsView;
