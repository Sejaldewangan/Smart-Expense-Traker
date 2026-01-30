import React, { createContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
    transactions: JSON.parse(localStorage.getItem('transactions')) || [],
    currency: localStorage.getItem('currency') || '$',
    theme: localStorage.getItem('theme') || 'dark'
};

// Create context
export const TransactionContext = createContext(initialState);

// Reducer
const AppReducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            };
        case 'DELETE_MULTIPLE_TRANSACTIONS':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => !action.payload.includes(transaction.id))
            };
        case 'UPDATE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.map(transaction =>
                    transaction.id === action.payload.id ? action.payload : transaction
                )
            };
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            };
        case 'SET_CURRENCY':
            return {
                ...state,
                currency: action.payload
            };
        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: state.theme === 'dark' ? 'light' : 'dark'
            };
        default:
            return state;
    }
};

// Provider Component
export const TransactionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Sync with LocalStorage & Apply Theme
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
    }, [state.transactions]);

    useEffect(() => {
        localStorage.setItem('currency', state.currency);
    }, [state.currency]);

    useEffect(() => {
        localStorage.setItem('theme', state.theme);
        document.documentElement.setAttribute('data-theme', state.theme);
    }, [state.theme]);

    function deleteTransaction(id) {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }

    function deleteMultipleTransactions(ids) {
        dispatch({ type: 'DELETE_MULTIPLE_TRANSACTIONS', payload: ids });
    }

    function addTransaction(transaction) {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }

    function updateTransaction(transaction) {
        dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
    }

    function setCurrency(currency) {
        dispatch({ type: 'SET_CURRENCY', payload: currency });
    }

    function toggleTheme() {
        dispatch({ type: 'TOGGLE_THEME' });
    }

    return (
        <TransactionContext.Provider value={{
            transactions: state.transactions,
            currency: state.currency,
            theme: state.theme,
            deleteTransaction,
            deleteMultipleTransactions,
            addTransaction,
            updateTransaction,
            setCurrency,
            toggleTheme
        }}>
            {children}
        </TransactionContext.Provider>
    );
};
