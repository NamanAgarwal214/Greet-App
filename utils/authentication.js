const jsonwebtoken = require('jsonwebtoken');

function issueJWT(req, res, user) {
  const id = user._id;

  const expiresIn = process.env.JWTEXPIRESIN;

  const signedToken = jsonwebtoken.sign({sub: id}, process.env.JWT_SECRET, {
    expiresIn: expiresIn
  });
  
  res.cookie('jwt', signedToken, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    )
  })

  // console.log(signedToken);

  return signedToken;
}

module.exports.issueJWT = issueJWT;
