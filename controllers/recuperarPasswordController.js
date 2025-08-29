const UsuariosModel = require("../models/usuariosModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const argon = require("argon2");

const forgotPasswordController = async (req, res) => {
  const { emailUsuario } = req.body;

  try {
    const usuario = await UsuariosModel.findOne({ emailUsuario });
    if (!usuario) {
      return res.status(404).json({ msg: "No existe usuario con ese correo" });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_APP_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    
      const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;


    await transporter.sendMail({
      from: process.env.GMAIL_APP_USER,
      to: usuario.emailUsuario,
      subject: "Recuperación de contraseña",
      html: `
        <h3>Hola ${usuario.nombreUsuario}</h3>
        <p>Has solicitado restablecer tu contraseña.</p>
        <a href="${resetURL}" target="_blank">Haz clic aquí para cambiarla</a>
        <p>Este enlace caduca en 1 hora.</p>
      `,
    });

    res.json({ msg: "Correo enviado con instrucciones" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};


const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await UsuariosModel.findById(decoded.id);
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

    usuario.password = await argon.hash(password);
    await usuario.save();

    res.json({ msg: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Token inválido o expirado" });
  }
};

module.exports = { forgotPasswordController, resetPasswordController };
