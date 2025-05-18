import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Invoice } from '../types';

// Generate PDF from HTML element
export const generatePdf = async (element: HTMLElement): Promise<Blob> => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: 'white',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    return new Blob([pdf.output('blob')], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// For backward compatibility
export const generatePDF = async (invoice: Invoice): Promise<Blob> => {
  const element = document.getElementById('invoice-preview');
  if (!element) {
    throw new Error('Invoice preview element not found');
  }
  return generatePdf(element);
};

// Generate a URL for the PDF
export const generatePdfUrl = async (element: HTMLElement): Promise<string> => {
  const pdfBlob = await generatePdf(element);
  return URL.createObjectURL(pdfBlob);
};

export const downloadPDF = async (invoice: Invoice): Promise<void> => {
  try {
    const element = document.getElementById('invoice-preview');
    if (!element) {
      throw new Error('Invoice preview element not found');
    }
    
    const pdfBlob = await generatePdf(element);
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