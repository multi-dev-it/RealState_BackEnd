import nodemailer from 'nodemailer'
import { mailHost, mailPassword, mailUser } from '../config/index.js'

const transporter = nodemailer.createTransport({
  host: mailHost,
  port: 587,
  secure: false,
  auth: {
    user: mailUser,
    pass: mailPassword,
  },
})

const sendEmail = async (receiver, emailTemp) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Realstate Agency" <noreply@realstate-agency.com>',
    to: receiver,
    subject: 'Verify Your Email Address for Realstate Agency',
    text: '',
    html: emailTemp,
  })
}

export default sendEmail
