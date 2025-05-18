import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { Invoice } from '../types';

export const generatePDF = async (invoice: Invoice): Promise<Blob> => {
  // Get the invoice element
  const element = document.getElementById('invoice-preview');
  if (!element) {
    throw new Error('Invoice preview element not found');
  }

  try {
    // Convert the element to a PNG
    const dataUrl = await toPng(element, { 
      quality: 0.95,
      backgroundColor: 'white',
      width: element.offsetWidth,
      height: element.offsetHeight
    });
    
    // Create a new PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Calculate dimensions to fit the image properly on the page
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (element.offsetHeight * imgWidth) / element.offsetWidth;
    
    // Add the image to the PDF
    pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Return the PDF as a blob
    return pdf.output('blob');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const downloadPDF = async (invoice: Invoice): Promise<void> => {
  try {
    const pdfBlob = await generatePDF(invoice);
    const url = URL.createObjectURL(pdfBlob);
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice-${invoice.invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};