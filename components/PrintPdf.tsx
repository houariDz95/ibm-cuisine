"use client";

import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For table formatting
import { Button } from './ui/button';

declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

const PrintPdf = (
    { total, items, createdAt, phone, address, name, totalVercement, factureNumber }:
     { 
        total: number,
        phone: number,
        address: string,
        name: string, 
        totalVercement: number, 
        items: any[], 
        createdAt: string, 
        factureNumber: number, 
    }) => {

    const handlePrint = async () => {
        const doc = new jsPDF();

        // 1. Add Logo
        const response = await fetch('/logo.png'); // Path to the logo in the public folder
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const logo = reader.result as string;
            doc.addImage(logo, 'PNG', 150, 10, 50, 20); // Position: Top Right

            // 2. Company Name on the Left
            doc.setFontSize(22);
            doc.setTextColor(67, 193, 107); // Set text color to black
            doc.text('IBM', 14, 25); // IBM in black

            doc.setTextColor(0); // Reset color to black
            doc.text('Cuisine', 28, 25); // Cuisine in black, aligned next to IBM

            // 3. Facture Information Below Company Name
            doc.setFontSize(10);
            doc.setTextColor(0);
            doc.text(`Facture N°: ${factureNumber}`, 14, 40);
            doc.text(`Date: ${new Date(createdAt).toLocaleDateString('fr-FR')}`, 14, 48);

            // 4. Personal Data Below Facture Information
            doc.text(`Téléphone: 0553088954 | 055118344`, 14, 56);
            doc.text('Email: ibmcuisine@gmail.com', 14, 64); // Replace with actual email
            doc.text(`Adresse: 06 hai el salam oran`, 14, 72);

            // 5. Client Information on the Right
            doc.text(`Client: ${name}`, 145, 40);
            doc.text(`Adresse: ${address}`, 145, 48);
            doc.text(`Téléphone: 0${phone}`, 145, 56);

            // 6. Line Break Before Table
            doc.setLineWidth(0.5);
            doc.line(14, 82, 200, 82); // Draw horizontal line

            // 7. Add Table Headers and Data (Take Full Width)
            const tableColumnHeaders = ['#', 'Produit', 'Dimension', 'C Exterieur', 'C Interieur', 'T Modèles', 'T Accessoires', 'Prix (DZD)'];
            const tableRows = items.map((item: any, index: number) => [
                index + 1, // Row number
                item.product, // Product name
                item.hauteurDePleinte || 'N/A', // Hauteur de Pleinte
                item.couleurExterieur || 'N/A', // Couleur Exterieur
                item.couleurInterieur || 'N/A', // Couleur Interieur
                item.typeModeles || 'N/A', // Type Modèles
                item.typeAccessoirs || 'N/A', // Type Accessoires
                new Intl.NumberFormat('en-DZ', { style: 'currency', currency: 'DZD' }).format(item.price), // Formatted price
            ]);

            doc.autoTable({
                head: [tableColumnHeaders],
                body: tableRows,
                startY: 87, // Y position where the table starts
                theme: 'grid', // Style of the table
                headStyles: { 
                    fillColor: null, // Transparent background for the header
                    textColor: [0, 0, 0], // Black text color
                    lineColor: [0, 0, 0], // Black borders for the grid
                    lineWidth: 0.5, // Set the line width for the grid
                },
                styles: {
                    lineColor: [0, 0, 0], // Black borders for the entire table grid
                    lineWidth: 0.5, // Set the line width for the grid
                    textColor: [0, 0, 0]  // Black text color for the body rows as well
                }
            });

            // 8. Final Y position after the table
            const finalY = (doc as any).autoTable.previous.finalY || 100;

            // 9. Add Total Price and Total Vercement on the Left
            doc.setFontSize(13);
            doc.text(`Total: ${new Intl.NumberFormat('en-DZ', { style: 'currency', currency: 'DZD' }).format(total)}`, 14, finalY + 20);
            doc.text(`Versement: ${new Intl.NumberFormat('en-DZ', { style: 'currency', currency: 'DZD' }).format(totalVercement)}`, 14, finalY + 30);

            doc.setFontSize(16);
            doc.text('Pluse de details:', 14, finalY + 50);
            
            // Draw a larger square (rectangular) to take almost the width of the paper
            const squareX = 14; // X position of the square
            const squareY = finalY + 60; // Y position of the square (below the text)
            const squareWidth = doc.internal.pageSize.width - 28; // Almost the full width of the paper (with some margins)
            const squareHeight = 100; // Adjust height as needed
            
            doc.rect(squareX, squareY, squareWidth, squareHeight); // Draw a large square (x, y, width, height)
            
            


            // 10. Footer Message at the Bottom of the Page
            const pageHeight = doc.internal.pageSize.height;
            doc.setFontSize(12);
            doc.text('Merci pour votre confiance !', 14, pageHeight - 26);
            doc.text('N\'hésitez pas à nous contacter pour toute question.', 14, pageHeight - 22);

            // 11. Save the PDF
            doc.save(`facture-${name}.pdf`);
        };
    };

    return (
        <Button className="shad-primary-btn" onClick={handlePrint}>
            Télécharger PDF
        </Button>
    );
}

export default PrintPdf;
