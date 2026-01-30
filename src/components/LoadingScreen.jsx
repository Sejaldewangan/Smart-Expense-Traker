import React from 'react';
import { Wallet } from 'lucide-react';

const LoadingScreen = ({ isFadeOut }) => {
    return (
        <div className={`loader-container ${isFadeOut ? 'fade-out' : ''}`}>
            <div className="loader-visual">
                <div className="loader-ring"></div>
                <div className="loader-ring"></div>
                <div className="loader-ring"></div>
                <div className="loader-icon-glow"></div>
                <div className="loader-icon">
                    <Wallet size={60} />
                </div>
            </div>
            <div className="loader-text">
                SmartTracker
            </div>
        </div>
    );
};

export default LoadingScreen;
