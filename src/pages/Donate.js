import React, { useEffect, useState } from 'react';
import DonateQR from '../assets/donationQR.png';

export default function Donate() {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js';
        script.async = true;
        script.onload = () => {
            setScriptLoaded(true);
        };
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    return (
        <main>
            <div className="container">
                <section className="hero">
                    <div className="roboCards">
                        <div className="robocard">
                            <div className="robocard-header">Donations to RoboTZ</div>
                            <span>
                                Your support for our nonprofit robotics program is crucial to bringing STEM opportunities to the youth of our community.<br />
                                Many RoboTZ students have gone on to work/study and further their education in engineering, mechanical, and computer science fields.<br />
                                Your contribution today makes a difference for the future of tomorrow.<br /><br />
                                Thank you for your RoboTZ support!
                            </span><br /><br />

                            {scriptLoaded && (
                                <div
                                    className="zeffy-button"
                                    data-form-id="e74405bb-b48a-4b73-ae13-8996a89bb3a3"
                                    data-color="#1c75bc"
                                    data-shape="rect"
                                    data-size="large"
                                ></div>
                            )}

                            <br /><br />
                            OR<br /><br />
                            <img src={DonateQR} alt="Donation QR Code" />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
