import emailjs from "@emailjs/nodejs";

export const sendMail = async ({ name, email, subject, message, html }) => {
  emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
  });
  const response = await emailjs.send(
    process.env.EMAILJS_SERVICE_ID,
    process.env.EMAILJS_TEMPLATE_ID,
    {
      subject,
      name,
      message,
      email,
      from_name: "ImpactShaala",
      html,
    }
  );
  return response;
};
