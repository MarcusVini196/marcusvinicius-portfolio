import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nome, email, mensagem } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"Site" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Contato do site",
      text: `
Nome: ${nome}
Email: ${email}
Mensagem:
${mensagem}
      `
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Erro ao enviar email" });
  }
}
