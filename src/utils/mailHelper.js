const nodemailer = require('nodemailer');

export const sendMail = async (receiverMail, jwt) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'orland.kassulke@ethereal.email',
      pass: 'C7yzUfBAHqDJSGpZ5T'
    }
  });

  let info = await transporter.sendMail({
    from: '"Fundoo Notes" <orland.kassulke@ethereal.email>',
    to: receiverMail,
    subject: 'Forgot Password JWT Token',
    text: `JWT -> ${jwt}`
  });

  console.log('message id ' + info.messageId);

  return info;
};
