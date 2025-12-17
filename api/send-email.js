import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS existe?", !!process.env.EMAIL_PASS);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Variáveis de ambiente não definidas");
    return res.status(500).json({
      error: "Configuração de email ausente"
    });
  }


  const { nome, email, mensagem } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
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
    console.error("ERRO REAL DO NODEMAILER:", err);
    return res.status(500).json({
      error: "Erro ao enviar email",
      details: err.message
    });
  }
}
