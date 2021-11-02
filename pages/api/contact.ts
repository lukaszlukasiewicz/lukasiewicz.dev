import type { NextApiRequest, NextApiResponse } from 'next'

type mailData = {
  name: string,
  email: string,
  message: string,
}

async function send({ name, email, message }: mailData) {
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PSWD,
    },
    secure: true,
  });
  const mailData = {
    from: process.env.EMAIL,
    to: 'lukasz.lukasiewicz@gmail.com',
    subject: `Message From website`,
    headers: {
      'Reply-To': email
    },
    html: `<div>
      <p>${name}</p>
      <p>${message}</p>
    </div>`
  }
  try {
    await transporter.sendMail(mailData)
    return { error: false, msg: "mail sent" }
  } catch (err) {
    return { error: true, msg: err }
  }
}

const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, message } = req.body
  if (!name || !message || !email) return res.status(400).json({ err: "Missing name, message or email" })
  if (!email.match(mailRegex)) return res.status(400).json({ err: "Not valid email" })
  send({ name, email, message }).then(response => {
    const code = response.error ? 400 : 200
    return res.status(code).json(response)
  })
}
