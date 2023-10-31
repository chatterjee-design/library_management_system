import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async function ( subject, message, email ) {
   
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: 'mousumichatterjee6379@gmail.com', 
    pass: 'pjjp boea ywhw iqyb',    
  }
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'mousumichatterjee6379@gmail.com', // sender address
    to: email, // user email
    subject: subject, // Subject line
    html: message, // html body
  });
};

export default sendEmail;
