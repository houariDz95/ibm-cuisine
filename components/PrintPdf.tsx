"use client";

import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For table formatting
import { Button } from './ui/button';

declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

const PrintPdf = ({ total, items, id, createdAt, phone, address, name, totalVercement }: { total: number, phone: number, address: string, name: string, totalVercement: number, items: any[], id: string, createdAt: string }) => {

    const handlePrint = async  () => {
        const doc = new jsPDF();

        // 1. Add Logo
        const response = await fetch('/reading.png'); // Path to the logo in the public folder
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const logo = reader.result as string;
        doc.addImage(logo, 'PNG', 150, 10, 50, 20); // Position: Top Right

        // 2. Add a Title or Header
        doc.setFontSize(22);
        doc.setTextColor(40);
        doc.text('IBM Cuisine', 14, 40); // Adjusted position to account for the logo

        // 3. Add Facture Information
        doc.setFontSize(12);
        doc.text(`Facture ID: ${id}`, 14, 50);
        doc.text(`Date: ${new Date(createdAt).toLocaleDateString()}`, 14, 58);

        // 4. Add Client Information
        doc.text(`Client: ${name}`, 14, 66);
        doc.text(`Phone: ${phone}`, 14, 74);
        doc.text(`Address: ${address}`, 14, 82);

        // 5. Add a Line Break
        doc.setLineWidth(0.5);
        doc.line(14, 87, 200, 87);

        // 6. Add Table Headers and Data
        const tableColumnHeaders = ['#', 'Product', 'Price (DZD)'];
        const tableRows = items.map((item: any, index: number) => [
            index + 1, // Row number
            item.product, // Product name
            new Intl.NumberFormat('en-DZ', { style: 'currency', currency: 'DZD' }).format(item.price), // Formatted price
        ]);

        // Generate the table
        doc.autoTable({
            head: [tableColumnHeaders],
            body: tableRows,
            startY: 92, // Y position where the table starts
            theme: 'grid', // Style of the table
            headStyles: { fillColor: [41, 128, 185] }, // Optional: Header style
        });

        // 7. Get the final Y position after the table
        const finalY = (doc as any).autoTable.previous.finalY || 100;

        // 8. Add Total Price and Total Vercement
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text(`Total: ${new Intl.NumberFormat('en-DZ', { style: 'currency', currency: 'DZD' }).format(total)}`, 14, finalY + 20);
        doc.text(`Vercement: ${new Intl.NumberFormat('en-DZ', { style: 'currency', currency: 'DZD' }).format(totalVercement)}`, 14, finalY + 30);

        // 9. Add Footer Information
        doc.setFontSize(12);
        doc.text('Thank you for your business!', 14, finalY + 40);
        doc.text('Please contact us if you have any questions.', 14, finalY + 46);

        // 10. Add Your Contact Information at the Bottom
        doc.setFontSize(10);
        doc.text(`Phone: ${phone}`, 14, 280); // Adjust X and Y positions as needed
        doc.text('Email: example@example.com', 14, 285); // Replace with actual email
        doc.text(`Address: ${address}`, 14, 290); // Replace with actual address

        // 11. Save the PDF
        doc.save(`facture-${id}.pdf`);
    }
    };
    return (
        <Button className="shad-primary-btn" onClick={handlePrint}>
            Download PDF
        </Button>
    );
}

export default PrintPdf;
