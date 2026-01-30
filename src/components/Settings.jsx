import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Card, Button, Input, Select } from './UIComponents';
import { toast } from 'sonner';
import { Settings as SettingsIcon, Moon, Sun, Trash2, Shield, User, Bell } from 'lucide-react';

const Settings = () => {
    const {
        currency, setCurrency,
        theme, toggleTheme,
        budget, setBudget,
        clearData
    } = useContext(TransactionContext);

    const [tempBudget, setTempBudget] = useState(budget);

    const handleSaveBudget = () => {
        setBudget(Number(tempBudget));
        toast.success('Monthly budget updated!');
    };

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            clearData();
            toast.success('All data cleared');
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--primary)', borderRadius: '12px', color: 'white' }}>
                    <SettingsIcon size={24} />
                </div>
                <div>
                    <h2 style={{ margin: 0 }}>Project Settings</h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage your preferences and data</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {/* General Settings */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <User size={18} color="var(--primary)" />
                        <h3 style={{ margin: 0 }}>General</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Currency</label>
                            <Select value={currency} onChange={(e) => {
                                setCurrency(e.target.value);
                                toast.info(`Currency changed to ${e.target.value}`);
                            }}>
                                <option value="$">USD ($)</option>
                                <option value="€">EUR (€)</option>
                                <option value="£">GBP (£)</option>
                                <option value="₹">INR (₹)</option>
                            </Select>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem' }}>Appearance</h4>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    Switch between light and dark mode
                                </p>
                            </div>
                            <Button variant="ghost" onClick={toggleTheme} style={{ padding: '0.5rem' }}>
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Budgeting Settings */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Bell size={18} color="var(--primary)" />
                        <h3 style={{ margin: 0 }}>Budgeting</h3>
                    </div>

                    <div>
                        <Input
                            label="Monthly Budget"
                            type="number"
                            value={tempBudget}
                            onChange={(e) => setTempBudget(e.target.value)}
                        />
                        <Button onClick={handleSaveBudget} style={{ width: '100%' }}>
                            Save Budget
                        </Button>
                    </div>
                </Card>

                {/* Data Security */}
                <Card style={{ gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Shield size={18} color="var(--danger)" />
                        <h3 style={{ margin: 0 }}>Data & Privacy</h3>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                        <div>
                            <h4 style={{ margin: 0, color: 'var(--danger)' }}>Clear Local Data</h4>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                This will permanently delete all your transactions and reset settings.
                            </p>
                        </div>
                        <Button variant="danger" onClick={handleClearAll}>
                            <Trash2 size={16} style={{ marginRight: '0.5rem' }} />
                            Clear All
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
