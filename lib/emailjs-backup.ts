// This file is kept as a backup reference for alternative EmailJS configurations
// The main implementation is in emailjs.ts

import emailjs from '@emailjs/browser';

interface EmailData {
  name: string;
  email: string;
  message: string;
}

// Alternative EmailJS implementation with different parameter names
// Use this if the main implementation doesn't work with your EmailJS template
export const sendEmailAlt = async (data: EmailData) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS configuration is missing');
  }

  // Initialize EmailJS
  emailjs.init(publicKey);

  // Alternative parameter names that might match different templates
  const templateParams = {
    from_name: data.name,
    reply_to: data.email,
    message: data.message,
    to_name: 'Younus', // Your name
  };

  return emailjs.send(serviceId, templateId, templateParams);
};

// Legacy implementation - kept for reference
export const sendEmailLegacy = async (data: EmailData) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS configuration is missing');
  }

  // Simple template parameters without initialization
  const templateParams = {
    name: data.name,
    email: data.email,
    message: data.message,
  };

  return emailjs.send(serviceId, templateId, templateParams, publicKey);
};
