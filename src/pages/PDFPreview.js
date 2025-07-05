import React, { useEffect, useState } from 'react';

export default function PDFPreview() {
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        const url = localStorage.getItem('pdfPreviewUrl');
        setPdfUrl(url);
    }, []);

    return (
        <div className="hero">
            <span>Student Application - Print or save for your records<br/>A copy has been emailed to RoboTZ<br/><br/></span>
            <iframe
                src={pdfUrl}
                width="50%"
                height="800px"
                style={{ border: 'none' }}
                title="PDF Preview"
            />
        </div>
    );
}
