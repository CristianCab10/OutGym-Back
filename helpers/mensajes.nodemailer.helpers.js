const transporter = require("../middlewares/nodemailer.middlewars");

const registroExitoso = async (emailUsuario, nombreUsuario) => {
  try {
    const info = await transporter.sendMail({
      from: `"OUTGYM" <${process.env.GMAIL_APP_USER}>`,
      to: emailUsuario,
      subject: "Registro exitoso ✔",
      html: `
        <b>Bienvenido ${nombreUsuario}</b>
        <br />
        <img src="https://trello.com/1/cards/6888e09d1515c092d85700e4/attachments/6888e3613de3eb5b24748df6/download/LOGO_TRANSPARENTE_NEGRO.png" alt="OutGym Logo" width="200"/>
        <h1>Gracias por formar parte de OUTGYM</h1>
      `,
    });

    return {
      msg: "ok",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const recuperarContrasenia = async (token, emailUsuario) => {
  try {
    const info = await transporter.sendMail({
      from: `"OUTGYM" <${process.env.GMAIL_APP_USER}>`,
      to: emailUsuario,
      subject: "Recupera tu contraseña ✔",
      html: `
        <img src="https://cdn-icons-gif.flaticon.com/6569/6569158.gif" alt="Recuperar contraseña" width="150" />
        <b>Seguí estos pasos:</b>
        <h3>Haz clic en el siguiente botón:</h3>
        <a href="http://localhost:3000/recuperarContrasenia/${token}" style="display: inline-block; padding: 10px 15px; background-color: #0a74da; color: white; text-decoration: none; border-radius: 5px;">Ir a la página</a>
      `,
    });

    return {
      msg: "ok",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  registroExitoso,
  recuperarContrasenia,
};

