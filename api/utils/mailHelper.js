import emailjs from '@emailjs/nodejs';

export const sendMail = async (name, email, subject, message) => {
    emailjs.init({
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      });
      const response = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        {
          subject: subject,
          name: name,
          message: message,
          email: email,
          from_name: "ImpactShaala",
        },
      )
      return response;
}