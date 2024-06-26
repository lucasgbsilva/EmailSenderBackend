require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('Hello World!');
});

app.post('/send-email-contact', async (req, res) => {
    const { nome, email, mensagem } = req.body;
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    const mailOptions = {
        from: "lucas.outro0106@gmail.com",
        to: email,
        subject: 'Submissão via tela de contato',
        text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
        html: `<b>Nome</b>: ${nome}<br><b>Email</b>: ${email}<br><b>Mensagem</b>: ${mensagem}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/send-email-confirmation', async (req, res) => {
    const emailCode = Math.floor(Math.random() * 900000) + 100000;
    
    
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    
    const mailOptions = {
        from: "lucas.outro0106@gmail.com",
        to: req.body.email,
        subject: "Confirme seu endereço de email",
        text: `Use o seguinte código de 6 dígitos para confirmar seu endereço de email:` + emailCode.toString(),
        html: `Use o seguinte <b>código</b> de 6 dígitos para <b>confirmar</b> seu endereço de <b>email</b>:<b>${emailCode}</b>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email enviado");
        

        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/send-email-welcome', async (req, res) => {
    const { nome, email, mensagem } = req.body;
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    const mailOptions = {
        from: "lucas.outro0106@gmail.com",
        to: email,
        subject: 'Submissão via tela de contato',
        text: `Olá ${nome},

        Seja muito bem-vindo(a) ao Senac!
        
        ${mensagem} `,
        html: `Olá <b>${nome}</b>,\n\n
        Seja muito bem-vindo(a) ao Senac!\n\n

        ${mensagem}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/send-email-passwordrec', async (req, res) => {
    const chars = ".,;:?!'_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const string_length = 8;
let randomstring = '';

for (let i = 0; i < string_length; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
}
    
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    
    const mailOptions = {
        from: "lucas.outro0106@gmail.com",
        to: req.body.email,
        subject: "Senha de recuperação do Email",
        text: `Esta é uma senha temporária, logo após login altere a senha:` + randomstring,
        html: `Esta é uma senha temporária, logo após login altere a senha:\n\n<b>${randomstring}</b>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email enviado");
        

        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});


app.post('/send-email-passwordmod', async (req, res) => {
    const { nome, email, mensagem } = req.body;
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    const mailOptions = {
        from: "lucas.outro0106@gmail.com",
        to: email,
        subject: 'Sua senha foi modificada com sucesso.',
        text: `Olá ${nome},

        Informamos que sua senha foi alterada com sucesso.
        
        Se você não solicitou essa mudança, entre em contato conosco imediatamente.
        
        Atenciosamente,
        
        Alberto
        Senac`,
        html: `Olá <b>${nome}</b>,<br>

        ${mensagem}<br>
        
        Alberto
        Senac`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`O servidor está rodando na porta http://localhost:${port}`);
});
