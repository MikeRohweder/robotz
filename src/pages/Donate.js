import React from 'react';
import DonateQR from '../assets/donationQR.png';

export default function Donate() {
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
                            </span>
                            <br /><br />

                            <iframe
                                title="Zeffy Donation Form"
                                src="https://www.zeffy.com/en/donation-form/e74405bb-b48a-4b73-ae13-8996a89bb3a3"
                                width="100%"
                                height="800"
                                frameBorder="0"
                                style={{ border: 'none', maxWidth: '100%' }}
                                allowFullScreen
                            ></iframe>

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
