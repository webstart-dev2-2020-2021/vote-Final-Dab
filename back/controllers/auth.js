const User = require('../models/user')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()

module.exports = {
  async signup(req, res) {
    //Signup
    const mailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const { name, password, email } = req.body
    if (!name || !password || !email) {
      return res.status('401').json({
        success: false,
        message: 'Les champs : name, password et email sont obligatoires !',
      })
    }

    if (!mailRegex.test(String(email).toLocaleLowerCase())) {
      return res.status('401').json({
        success: false,
        message: "L'adresse email fournit n'est pas conforme !",
      })
    }

    try {
      const newUser = new User({ name, password, email })
      newUser.setPassword(password)
      const savedUser = await newUser.save()

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: '',
          pass: '',
        },
      })

      let mailOptions = {
        from: 'api.vote@gmail.com',
        to: email,
        subject: 'Account created',
        text: `
          Hello ${name} !
          If you received this email then your account have been created successfully !
          Congratulation ! You are now part of the team with many other people around the world !
        `,
      }

      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log('An error accurs : ', err)
        } else {
          console.log('Email send !')
        }
      })

      return res.status(201).send({
        sucess: true,
        name: savedUser.name,
        _id: savedUser._id,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: "Le name ou l'adresse email existe déjà !",
      })
    }
  },

  async signin(req, res) {
    //Signin
    const { name, password } = req.body
    if (!name || !password) {
      return res.status('401').json({
        success: false,
        message: 'Les champs : name et password sont obligatoires !',
      })
    }

    try {
      const user = await User.findOne({ name })
      if (!user || !user.passwordIsValid(password)) {
        res.status('401').json({
          success: false,
          message: "Le nom d'utilisateur ou le mot de passe est invalid !",
        })
        throw new Error(
          "Erreur ! Le nom d'utilisateur ou le mot de passe est invalid !"
        )
      }
      const jwt = user.generateJWT()
        const isAdmin = user.isAdmin
        const pseudo = user.name
        const id = user.id
      return res.status('200').json({
        success: true,
        jwt,
          isAdmin,
          pseudo,
          id

      })
    } catch (error) {
      console.error('erreur dans le post /signin : ', error)
      return res.status('500').json({
        success: false,
        message: 'Il semblerait que nous rencontrons un problème ...',
      })
    }
  },
}
