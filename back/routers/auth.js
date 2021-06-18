const express = require('express')
const controller = require('../controllers/auth.js')

exports.router = (() => {
  const auth = express.Router()

  //Routes
  auth.route('/signup/').post(controller.signup)  //Signup
  auth.route('/signin/').post(controller.signin)  //Signin

  return auth
})()