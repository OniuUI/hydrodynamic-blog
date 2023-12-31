import React, { useState, useEffect } from 'react';
import './style.css';
import iconImage from './img/logo-png-white.png';

const ComingSoon: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const countdownDate = new Date('August 20, 2023 00:00:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="coming-soon-container">
            <a href="https://hydrodynamic.no" target="_blank" rel="noopener noreferrer">
                <img src={iconImage} alt="Hydro Dynamics" className="redirect-icon" />
            </a>
            <div className="title-wrapper">
                <span className="top-title">Our blog is</span>
                <div className="sweet-title">
                    <span data-text="Coming">Coming </span>
                    <span data-text="Soon">Soon!</span>
                </div>
                <span className="bottom-title">Stay tuned for something amazing!</span>
            </div>
            <div className="countdown">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
        </div>
        );
};

export default ComingSoon;
