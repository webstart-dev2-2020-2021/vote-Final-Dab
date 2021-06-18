const jwt = require('jsonwebtoken')

module.exports = function decodeToken(req, res, next) {
  if (!req.headers.authorization) {
    //Check if there is a token
    return res.status('403').json({
      success: false,
      message: "Connectez-vous d'abord !",
    })
  }

  try {
    //Check if token is valid
    token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET)

    req.userIsAdmin = decoded.isAdmin
    req.userId = decoded._id

    decoded ? next() : '' //If token is valid pass else go in catch
  } catch (error) {
    console.log('authUser ~> error ~>', error) // Error
    return res.status('401').json({
      success: false,
      message:
        'Il semblerait que votre token soit invalid, veuillez vous reconnecter !',
    })
  }
}
