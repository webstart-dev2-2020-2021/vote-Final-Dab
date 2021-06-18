const jwt = require('jsonwebtoken')

module.exports = function decodeTokenAndCheckIsAdmin(req, res, next){
  if (!req.headers.authorization) {   //Check if there is a token
    return res.status('403').json({
      success : false,
      message : "Connectez-vous d'abord !"
    })
  }

  try {   //Check if token is valid
    token =  req.headers.authorization.split(' ')[1]
    jwt.verify(token, JWT_SECRET, function(err, decoded) {
      console.log('isAdmin : ', decoded.isAdmin) // isAdmin du token
      if (!decoded.isAdmin) {
        return res.status('403').json({
          success : false,
          message : "Vous n'avez pas la permission d'entrer dans cette page !"
        })
      }
      next()    //If token is valid pass else go in catch
    });
  } catch (error) {
    console.log(error)    //Error
    return res.status('401').json({
      success : false,
      message : "Il semblerait que votre token soit invalid, veuillez vous reconnecter !"
    })
  }
}