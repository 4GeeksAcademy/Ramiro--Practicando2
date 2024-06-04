import React from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FileToConvertInPDF } from '../FileToConvertInPDF.jsx';

export const Certificate = () => {
    const exportPDF = () => {
        const input = document.getElementById('Certificate');
        html2canvas(input, { logging: true, letterRendering: 1, useCORS: true }).then(canvas => {
            const imgWidth = 208;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL("img/png");
            const pdf = new jsPDF("p", "mm", "a4")
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
            pdf.save("nombreDelPDF.pdf");
        })
    }
    return (
        <div className='Certificate'>
            <button onClick={exportPDF}>Print PDF</button>
            <header id='Certificate' className='Certificate-header'>
                {/* componente a guardar en pdf */}
                <FileToConvertInPDF />
            </header>
        </div>
    )
};