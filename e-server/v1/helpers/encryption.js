const bcrypt = require("bcryptjs");

function encrypt(text) {
    try {
        return bcrypt.hashSync(text);
    } catch (e) {
        console.log(e);
    }
    return undefined;
}

function compare(text, hash) {
    try {
        return bcrypt.compareSync(text, hash);
    } catch (err) {
        console.log(err);
    }
    return false;
}


module.exports = { encrypt, compare };