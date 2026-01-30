import React from 'react';
import { Card } from './UIComponents';
import { HelpCircle, Book, MessageCircle, Shield, Zap } from 'lucide-react';

const Help = () => {
    const faqs = [
        {
            question: "How is my data stored?",
            answer: "Currently, all your data is stored locally in your browser's LocalStorage. This means your data never leaves your device and remains private.",
            icon: <Shield size={20} />
        },
        {
            question: "Can I use multiple currencies?",
            answer: "Yes! You can change your preferred currency in the Settings tab. The app will automatically format all amounts accordingly.",
            icon: <Zap size={20} />
        },
        {
            question: "How do I set a budget?",
            answer: "Navigate to the Settings tab and enter your monthly budget. The dashboard will then show your progress relative to this goal.",
            icon: <Book size={20} />
        }
    ];

    return (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--primary)', borderRadius: '12px', color: 'white' }}>
                    <HelpCircle size={24} />
                </div>
                <div>
                    <h2 style={{ margin: 0 }}>Help & Support</h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Find answers to common questions</p>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Card>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MessageCircle size={20} color="var(--primary)" />
                        Frequently Asked Questions
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {faqs.map((faq, index) => (
                            <div key={index} style={{ borderBottom: index < faqs.length - 1 ? '1px solid var(--glass-border)' : 'none', paddingBottom: index < faqs.length - 1 ? '1.5rem' : 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--primary)' }}>{faq.icon}</span>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{faq.question}</h4>
                                </div>
                                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '2.25rem' }}>
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card style={{ background: 'linear-gradient(135deg, var(--primary), #818cf8)', color: 'white' }}>
                    <h3 style={{ color: 'white', WebkitTextFillColor: 'white' }}>Need more help?</h3>
                    <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>
                        If you have any feedback or encounter any bugs, please feel free to reach out to the developer.
                    </p>
                    <button style={{
                        background: 'white',
                        color: 'var(--primary)',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Contact Support
                    </button>
                </Card>
            </div>
        </div>
    );
};

export default Help;
