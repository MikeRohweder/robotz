import React from 'react';
import PushBackLogo from '../assets/pushback-logo.png';

export default function CurrentGame() {
    return (
        <main>
            <div className="container">
                <section className="hero">
                    <div className="roboCards">
                        <div className="robocard">
                            <div className="robocard-header">Introduction Video</div>
                            <iframe src="https://www.youtube.com/embed/ocmONiVun9M?si=M0E_pFfAy1W9semW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                        <div className="robocard">
                            <a href="https://content.vexrobotics.com/docs/25-26/v5rc-push-back/docs/PushBack-GameManual-0.1.pdf" target="_blank">
                                <div className="robocard-header">Game Manual</div>
                                <img className="roboCardItem" src={PushBackLogo} />
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
