import React from 'react';
import PushBackLogo from '../assets/pushback-logo.png';

export default function Home() {
    return (
        <main>
            <div className="hero">
                <h2>Welcome to RoboTZ!</h2>
                <br /><br />
                <div className="roboCards">
                    <div className="robocard">
                        <a href="currentGame.html" target="_blank">
                            <div className="robocard-header">Current Game<br />Vex - Push Back</div>
                            <img src={PushBackLogo} className="roboCardItem" alt="Current Game Logo" />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
