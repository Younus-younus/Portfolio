import emailjs from '@emailjs/browser';

interface EmailData {
  name: string;
  email: string;
  message: string;
}

// Input validation and sanitization
const validateAndSanitizeInput = (data: EmailData): EmailData => {
  // Basic validation
  if (!data.name || data.name.trim().length < 2) {
    throw new Error('Name must be at least 2 characters long');
  }
  
  if (!data.email || !data.email.includes('@')) {
    throw new Error('Please provide a valid email address');
  }
  
  if (!data.message || data.message.trim().length < 10) {
    throw new Error('Message must be at least 10 characters long');
  }

  // Sanitize inputs
  return {
    name: data.name.trim().slice(0, 100), // Limit name to 100 chars
    email: data.email.trim().slice(0, 254), // Email standard max length
    message: data.message.trim().slice(0, 1000), // Limit message to 1000 chars
  };
};

export const sendEmail = async (data: EmailData) => {
  try {
    // Validate and sanitize inputs
    const sanitizedData = validateAndSanitizeInput(data);
    
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('Email service is not properly configured. Please contact the administrator.');
    }

    // Template parameters
    const templateParams = {
      name: sanitizedData.name,
      email: sanitizedData.email,
      message: sanitizedData.message,
      timestamp: new Date().toISOString(),
    };

    // Send email without logging sensitive information
    const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    
    if (result.status === 200) {
      return { success: true, message: 'Email sent successfully!' };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    // Log error for debugging (without sensitive data)
    console.error('Email sending failed:', error instanceof Error ? error.message : 'Unknown error');
    
    // Return user-friendly error message
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to send email. Please try again later.');
    }
  }
};
