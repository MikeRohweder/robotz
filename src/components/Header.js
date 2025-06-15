import React from 'react';
import logo from '../assets/logo-neon.png';

export default function Header() {
    return (
        <header>
            <div className="container">
                <img className="logo-header" src={logo} alt="RoboTZ Logo"/>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/currentGame">Current Game</a></li>
                        <li><a href="/schedule">Schedule</a></li>
                        <li><a href="/donate">Donate</a></li>
                        <li><a href="/forms">Student Forms</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
