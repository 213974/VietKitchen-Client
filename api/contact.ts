// api/contact.ts

import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = request.body;

  if (!name || !email || !message) {
    return response.status(400).json({ message: 'Name, email, and message are required.' });
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Viet Kitchen Contact Form <onboarding@resend.dev>',
      to: ['213974@protonmail.com'], 
      replyTo: email,
      subject: `Contact Form: ${subject || 'No Subject'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'Not provided'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error({ error });
      return response.status(500).json({ message: 'Failed to send message.' });
    }

    return response.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'An internal server error occurred.' });
  }
}