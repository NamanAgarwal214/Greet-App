const crypto = require('crypto');

const genHashSalt = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')

    return {
        salt,
        hash
    }
};

module.exports.genHashSalt = genHashSalt;
