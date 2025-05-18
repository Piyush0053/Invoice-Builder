import { Invoice } from '../types';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Blob | string;
    encoding?: string;
    contentType?: string;
  }>;
}

export interface EmailResult {
  success: boolean;
  message?: string;
  error?: string;
}

export const sendInvoiceEmail = async (
  to: string,
  invoice: Invoice,
  pdfBlob: Blob
): Promise<EmailResult> => {
  try {
    const subject = `Invoice #${invoice.invoiceNumber} from ${invoice.from}`;
    const text = `Please find attached your invoice #${invoice.invoiceNumber}.\n\n` +
      `Amount Due: ${invoice.currency} ${invoice.total.toFixed(2)}\n` +
      `Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}\n\n` +
      `Thank you for your business!`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Invoice #${invoice.invoiceNumber}</h2>
        <p>Hello,</p>
        <p>Please find attached your invoice #${invoice.invoiceNumber}.</p>
        
        <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px;">
          <p><strong>From:</strong> ${invoice.from}</p>
          <p><strong>To:</strong> ${invoice.to}</p>
          <p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()}</p>
          <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
          <p><strong>Amount Due:</strong> ${invoice.currency} ${invoice.total.toFixed(2)}</p>
        </div>
        
        ${invoice.notes ? `<p><strong>Notes:</strong> ${invoice.notes}</p>` : ''}
        ${invoice.terms ? `<p><strong>Terms:</strong> ${invoice.terms}</p>` : ''}
        
        <p>Thank you for your business!</p>
        <p>Best regards,<br>${invoice.from}</p>
      </div>
    `;

    const result = await sendEmail({
      to,
      subject,
      text,
      html,
      attachments: [{
        filename: `invoice-${invoice.invoiceNumber}.pdf`,
        content: pdfBlob,
        contentType: 'application/pdf'
      }]
    });

    return {
      success: result,
      message: result ? 'Invoice sent successfully' : 'Failed to send invoice'
    };
  } catch (error) {
    console.error('Error sending invoice email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// In a real application, you would integrate with an email service like SendGrid, Mailgun, etc.
// For this example, we'll simulate the email sending and log it to the console.
const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    console.log('Sending email with options:', {
      ...options,
      // Don't log the actual content in production
      attachments: options.attachments?.map(a => ({
        ...a,
        content: a.content instanceof Blob ? '[BLOB]' : a.content
      }))
    });

    // In a real application, you would make an API call to your email service here
    // For example:
    // const response = await fetch('https://api.email-service.com/send', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.EMAIL_SERVICE_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     to: options.to,
    //     subject: options.subject,
    //     text: options.text,
    //     html: options.html,
    //     attachments: options.attachments?.map(attachment => ({
    //       filename: attachment.filename,
    //       content: attachment.content,
    //       encoding: 'base64',
    //       type: attachment.contentType || 'application/pdf',
    //     })),
    //   }),
    // });


    // For demo purposes, we'll simulate a successful response
    const success = true; // response.ok;
    
    if (!success) {
      throw new Error('Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Helper function to convert blob to base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]); // Remove the data URL prefix
      } else {
        reject(new Error('Failed to convert blob to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
