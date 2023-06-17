// Importar las dependencias necesarias
//import {PORT} from '/src/controllers/config.js'
const express = require('express');
const nodemailer = require('nodemailer')

const PORT  = process.env.PORT || 3000 || 3600;
const cors = require('cors');
const path = require('path');
const { body } = require('express-validator');

// Configurar CORS
const app = express();
app.use(cors());

// Definir rutas y configuraciones adicionales
// ...
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'peachycoold@gmail.com', // generated ethereal user
        pass: 'kjnpllzdkbwyixxz', // generated ethereal password
    },
});

const filePath = path.resolve(__dirname, 'models/personas.json');
const fs = require('fs');

app.get('/api/personas', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`este es el error${err}`);
      res.status(500).json({ error: 'Error al leer el archivo personas.json' });
    } else {
      const personas = JSON.parse(data);
      res.json(personas);
    }
  });
});

app.get('/', (req, res) => {
  res.send('<h1>HOla chiqui BBYs</h1>');
})

// Iniciar el servidor

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT} \n\n\n Hola me encanta esto\n\n\n` );
});


//QR

app.get('/qrdata', function (req, res, next) {
  const data = {
    elementos: [
      'https://www.recetasnestle.com.mx/escuela-sabor/recetas-caseras/como-hacer-lasana',
      'recetasderechupete.com/ensalada-caprese-receta-facil-y-rapida-de-esta-ensalada-italiana/49628/',
      'https://www.bonappetit.com/recipe/simple-carbonara',
      'https://www.directoalpaladar.com/recetas-de-arroces/arroz-a-milanesa-receta-italiana-original-risotto-alla-milanese',
      'https://saboryestilo.com.mx/gourmet/ossobuco/'
    ],
    src: [
      '/assets/media/QR/lassaña.jpg',
      '/assets/media/QR/capresse.jpg',
      '/assets/media/QR/pasta-carbonara.webp',
      '/assets/media/QR/rissoto.jpg',
      '/assets/media/QR/ossobusco.jpg'
    ],
    nombre: [
      "Lassaña",
      "Capresse",
      "Pasta Carbonara",
      "Rissoto",
      "Ossobusco"
    ]
  };

  const indiceAleatorio = Math.floor(Math.random() * data.elementos.length)

  const dataResponsive = {
    elemento: [data.elementos[indiceAleatorio]],
    src: [data.src[indiceAleatorio]],
    nombre: [data.nombre[indiceAleatorio]]
  };


  res.json(dataResponsive);
});

//correos
app.post('/mail', [
  body('user').not().isEmpty().isString(),
  body('subject').not().isEmpty().isString(),
  body('text').not().isEmpty().isString()
], (req, res) => {
  console.log("estoy enviando un correo :O0");
  let dato = req.body
  console.log(req.body.user)
  transporter.sendMail({
    from: '"Vittoria mails 👩‍💻👨‍💻👻" <peachycoold@gmail.com>', // sender address
    to: dato.user, // list of receivers *----------------------aqui se colocaria el objeto recuperado que nos envia el formlario
    subject: dato.subject,// "Hello ✔", // Subject line
    text: dato.text, //"Hello world? esto funciona?", // plain text body
    html: dato.text, // html body

  }, (error, info) => {
    console.log("New User 👩‍💻👨‍💻👻");
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado correctamente');
    }
  });

});

app.post('/mail/citas', [
  body('user').not().isEmpty().isString(),
  body('subject').not().isEmpty().isString(),
  body('text').not().isEmpty().isString()
], (req, res) => {
  console.log("estoy enviando un correo :O0");
  let dato = req.body
  console.log(req.body.user)
  transporter.sendMail({
    from: '"Vittoria mails 👩‍💻👨‍💻👻" <peachycoold@gmail.com>', // sender address
    to: dato.user, // list of receivers *----------------------aqui se colocaria el objeto recuperado que nos envia el formlario
    subject: dato.subject,// "Hello ✔", // Subject line
    text: dato.text, //"Hello world? esto funciona?", // plain text body
    html: dato.text, // html body

  }, (error, info) => {
    console.log("Nueva Cita 👩‍💻👨‍💻👻");
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado correctamente');
    }
  });

});

