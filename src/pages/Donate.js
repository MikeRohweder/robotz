import React from 'react';
import DonateQR from '../assets/donationQR.png';

export default function Donate() {
    return (
        <main>
            <div className="container">
                <section className="hero">
                    <div className="roboCards">
                        <div className="robocard">
                            <iframe
                                title="Zeffy Donation Form"
                                src="https://www.zeffy.com/en/donation-form/e74405bb-b48a-4b73-ae13-8996a89bb3a3"
                                width="100%"
                                height="800"
                                frameBorder="0"
                                style={{ border: 'none', maxWidth: '100%' }}
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
