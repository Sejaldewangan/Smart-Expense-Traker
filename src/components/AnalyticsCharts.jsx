import React, { useContext } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TransactionContext } from '../context/TransactionContext';
import { Card } from './UIComponents';

const COLORS = ['#6366f1', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];

const DEMO_PIE_DATA = [
    { name: 'Food', value: 400 },
    { name: 'Rent', value: 1200 },
    { name: 'Entertainment', value: 300 },
    { name: 'Transport', value: 200 },
    { name: 'Groceries', value: 500 }
];

const DEMO_TREND_DATA = [
    { name: 'Day 1', amount: 50 },
    { name: 'Day 2', amount: 80 },
    { name: 'Day 3', amount: 45 },
    { name: 'Day 4', amount: 90 },
    { name: 'Day 5', amount: 65 },
    { name: 'Day 6', amount: 120 },
    { name: 'Day 7', amount: 85 }
];

const AnalyticsCharts = () => {
    const { transactions, currency } = useContext(TransactionContext);
    const isDemo = transactions.length === 0;

    // Calculate data for Pie Chart (Expenses by Category)
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const categories = {};

    expenseTransactions.forEach(transaction => {
        if (categories[transaction.category]) {
            categories[transaction.category] += Number(transaction.amount);
        } else {
            categories[transaction.category] = Number(transaction.amount);
        }
    });

    const realPieData = Object.keys(categories)
        .filter(cat => categories[cat] > 0)
        .map((category) => ({
            name: category,
            value: categories[category]
        }));

    const pieData = isDemo ? DEMO_PIE_DATA : realPieData;

    // Calculate data for Area Chart
    const trendData = isDemo
        ? DEMO_TREND_DATA
        : [...transactions].reverse().map((t) => ({
            name: t.text,
            amount: Number(t.amount),
            type: t.type
        })).slice(0, 7);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'rgba(23, 23, 37, 0.9)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}>
                    <p style={{ color: '#fff', fontWeight: 'bold', margin: '0 0 4px 0', fontSize: '0.9rem' }}>{payload[0].name}</p>
                    <p style={{ color: 'var(--primary)', fontWeight: '600', margin: 0 }}>
                        {typeof payload[0].value === 'number' ? `${currency}${payload[0].value.toFixed(2)}` : payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', position: 'relative' }}>
            {isDemo && (
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 10,
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                }}>
                    Demo Mode
                </div>
            )}

            <Card className="animate-fade-in" style={{ opacity: isDemo ? 0.7 : 1 }}>
                <div className="card-header">
                    <h3>Expense Breakdown</h3>
                </div>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card className="animate-fade-in" style={{ opacity: isDemo ? 0.7 : 1 }}>
                <div className="card-header">
                    <h3>Activity Trend</h3>
                </div>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                            <XAxis dataKey="name" hide />
                            <YAxis hide />
                            <RechartsTooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="var(--primary)"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorAmount)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default AnalyticsCharts;
