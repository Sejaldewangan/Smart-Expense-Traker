import React, { useContext } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TransactionContext } from '../context/TransactionContext';
import { Card } from './UIComponents';

const COLORS = ['#6366f1', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];

const AnalyticsCharts = () => {
    const { transactions } = useContext(TransactionContext);

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

    const pieData = Object.keys(categories).map((category, index) => ({
        name: category,
        value: categories[category]
    }));

    // Calculate data for Area Chart (Spending over time - Dummy data approximation if dates match, or just listing transactions)
    // For simplicity in this version, we'll map last 7 transactions or group by date if possible. 
    // Let's do a simple map of recent transactions for the trend to show responsiveness.
    const trendData = [...transactions].reverse().map((t, i) => ({
        name: t.text, // Simplified for XAxis
        amount: Number(t.amount),
        type: t.type
    })).slice(0, 7); // Show last 7 activity points

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p style={{ color: '#fff', fontWeight: 'bold' }}>{payload[0].name}</p>
                    <p style={{ color: '#cbd5e1' }}>
                        ${Number(payload[0].value).toFixed(2)}
                    </p>
                </div>
            );
        }
        return null;
    };

    if (transactions.length === 0) {
        return (
            <Card className="animate-fade-in">
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    <p>Add transactions to see analytics</p>
                </div>
            </Card>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {pieData.length > 0 && (
                <Card className="animate-fade-in">
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
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip content={<CustomTooltip />} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            )}

            <Card className="animate-fade-in">
                <div className="card-header">
                    <h3>Recent Activity Trend</h3>
                </div>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                            <XAxis dataKey="name" hide />
                            <YAxis hide />
                            <RechartsTooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="#6366f1"
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
