import nodemailer from 'nodemailer';
import 'dotenv/config';

async function sendMail(toEmail) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                // IF USER AND PASS COMES WRONG ITS PROBABLY RELATED WITH .env
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail ,
            subject: 'Hello from Node.js',
            text: 'This is a plain text email body',
            html: '<p>This is the HTML version of the email body</p>'
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
}

export default sendMail();