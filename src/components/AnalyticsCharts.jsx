import React, { useContext } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TransactionContext } from '../context/TransactionContext';
import { Card } from './UIComponents';
import { cn } from '../utils/cn';

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
        : (() => {
            const dailyData = {};
            // Get last 7 days including today
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                dailyData[dateStr] = 0;
            }

            transactions.forEach(t => {
                const dateStr = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                if (dailyData.hasOwnProperty(dateStr)) {
                    if (t.type === 'expense') {
                        dailyData[dateStr] += Number(t.amount);
                    }
                }
            });

            return Object.keys(dailyData).map(date => ({
                name: date,
                amount: dailyData[date]
            }));
        })();

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card/90 backdrop-blur-xl border border-border/50 p-4 rounded-2xl shadow-2xl">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{payload[0].name}</p>
                    <p className="text-lg font-bold text-primary">
                        {typeof payload[0].value === 'number' ? `${currency}${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {isDemo && (
                <div className="absolute -top-3 -right-3 z-10 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-primary/20 animate-bounce">
                    Demo Mode
                </div>
            )}

            <Card className={cn(isDemo && "opacity-60 grayscale-[0.5]")}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Expense Breakdown</h3>
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        className="outline-none hover:opacity-80 transition-opacity"
                                    />
                                ))}
                            </Pie>
                            <RechartsTooltip content={<CustomTooltip />} />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                formatter={(value) => <span className="text-xs font-medium text-muted-foreground mr-4">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card className={cn(isDemo && "opacity-60 grayscale-[0.5]")}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Activity Trend</h3>
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary-hex)" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="var(--primary-hex)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                                minTickGap={10}
                            />
                            <YAxis hide />
                            <RechartsTooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="var(--primary-hex)"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorAmount)"
                                dot={{ fill: 'var(--primary-hex)', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--primary-hex)' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default AnalyticsCharts;
