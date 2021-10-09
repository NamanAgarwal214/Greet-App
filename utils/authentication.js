const fs = require('fs');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const pathTopubKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const PUB_KEY = fs.readFileSync(pathTopubKey, "utf8");


const genHashSalt = (password) => {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');

  return {
    salt,
    hash
  };
};

function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === hashVerify;
}

function issueJWT(req, res, user) {
  const _id = user._id;

  const expiresIn = process.env.JWTEXPIRESIN;

  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: 'RS256'
  });
  
  res.cookie('jwt', signedToken, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    )
  })

  // console.log(signedToken);

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn
  };
}

module.exports.genHashSalt = genHashSalt;
module.exports.validPassword = validPassword;
module.exports.issueJWT = issueJWT;
