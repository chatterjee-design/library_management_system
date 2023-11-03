import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async function ( subject, message, email ) {
   
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: process.env.SMTP_USERNAME, 
    pass: process.env.SMTP_PASSWORD    
  }
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL, // sender address
    to: email, // user email
    subject: subject, // Subject 
    html: message, // html body
  });
};

export default sendEmail;
