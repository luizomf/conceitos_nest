import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // Servidor SMTP
      port: parseInt(process.env.EMAIL_PORT, 587),
      secure: false, // Use SSL ou TLS (para ambientes de produção, certifique-se de usar "true" se o SMTP suportar SSL)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, content: string) {
    const mailOptions = {
      from: `"No Reply" <${process.env.EMAIL_FROM}>`, // De quem está enviando
      to, // Destinatário
      subject, // Assunto
      text: content, // Conteúdo do e-mail em texto simples
      // Se precisar enviar HTML, pode adicionar a propriedade "html"
      // html: '<b>HTML content</b>',
    };

    await this.transporter.sendMail(mailOptions);
  }
}
