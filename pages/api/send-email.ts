import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { firstname, email, Message } = req.body;

      let transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
          user: 'apikey', // This is the "user" for SendGrid's SMTP
          pass: process.env.NEXT_PUBLIC_SENDGRID_API_KEY, // API Key
        },
      });

      let info = await transporter.sendMail({
        from: 'test@example.com', // sender address
        to: 'saiharish017@gmail.com', // list of receivers
        subject: 'New Form Submission', // Subject line
        text: `Name: ${firstname}\nEmail: ${email}\nMessage: ${Message}`, // plain text body
        html: `<b>Name:</b> ${firstname}<br><b>Email:</b> ${email}<br><b>Message:</b> ${Message}`, // html body
      });

      console.log('Message sent: %s', info.messageId);

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}