import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatters';
import ExpenseForm from './ExpenseForm';
import TransactionList from './TransactionList';
import AnalyticsCharts from './AnalyticsCharts';
import { Card } from './UIComponents';
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';

import BudgetProgress from './BudgetProgress';

import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const Dashboard = () => {
    const { transactions, currency } = useContext(TransactionContext);

    const amounts = transactions.map(transaction => transaction.type === 'income' ? +transaction.amount : -transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0);

    const income = transactions
        .filter(item => item.type === 'income')
        .reduce((acc, item) => (acc += Number(item.amount)), 0);

    const expense = transactions
        .filter(item => item.type === 'expense')
        .reduce((acc, item) => (acc += Number(item.amount)), 0);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8"
        >
            {/* Left Column: Analytics & List */}
            <div className="flex flex-col gap-8 order-2 lg:order-1">
                <motion.div variants={item}>
                    <AnalyticsCharts />
                </motion.div>
                <motion.div variants={item}>
                    <TransactionList />
                </motion.div>
            </div>

            {/* Right Column: Balance, Budget & Form */}
            <div className="flex flex-col gap-8 order-1 lg:order-2">
                {/* Balance Card */}
                <motion.div
                    variants={item}
                    className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20"
                >
                    <div className="flex items-center gap-2 mb-2 opacity-90">
                        <DollarSign size={20} />
                        <span className="font-medium">Total Balance</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-8 tracking-tight">
                        {formatCurrency(total, currency)}
                    </h1>

                    <div className="flex gap-4">
                        <div className="flex-1 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-2 mb-1">
                                <ArrowUpCircle size={16} className="text-emerald-300" />
                                <span className="text-xs opacity-80 uppercase tracking-wider font-semibold">Income</span>
                            </div>
                            <span className="text-lg font-bold">{formatCurrency(income, currency)}</span>
                        </div>
                        <div className="flex-1 bg-black/10 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-2 mb-1">
                                <ArrowDownCircle size={16} className="text-rose-300" />
                                <span className="text-xs opacity-80 uppercase tracking-wider font-semibold">Expenses</span>
                            </div>
                            <span className="text-lg font-bold">{formatCurrency(expense, currency)}</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item}>
                    <BudgetProgress />
                </motion.div>
                <motion.div variants={item}>
                    <ExpenseForm />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
