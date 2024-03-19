import nodemailer from 'nodemailer'
import config from '../config'

// send mail from gmail
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'mukarrom.hosain.1@gmail.com',
      pass: 'iwwp qntd mrmx ojzy',
    },
  })

  await transporter.sendMail({
    from: '"Mukarrom Hosain" <mukarrom.hosain.1@gmail.com>', // sender address
    to, // list of receivers
    subject: 'Reset your password', // Subject line
    text: 'Forgot password?', // plain text body
    html, // html body
  })
}

// // send mail from ethereal.email
// export const sendEmail = async (to: string, html: string) => {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//       user: 'ron.rodriguez@ethereal.email',
//       pass: 'm1gVHmxZcywJ8Y8EKd',
//     },
//   })

//   await transporter.sendMail({
//     from: '"Mukarrom Hosain" <ron.rodriguez@ethereal.email>', // sender address
//     to, // list of receivers
//     subject: 'Reset your password', // Subject line
//     text: 'Forgot password?', // plain text body
//     html, // html body
//   })
// }

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);
