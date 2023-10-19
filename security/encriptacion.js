var crypto = require('crypto');


function encriptar(pass) {
    var cipher = crypto.createCipheriv('aes-256-cbc', crypto.createHash('sha256').update(String('robertoRomero')).digest('base64').slice(0, 32), Buffer.alloc(16, 0));
    var datosEncriptados = cipher.update(pass, 'utf8', 'hex');
    datosEncriptados += cipher.final('hex');
    return datosEncriptados;
}

function desencriptar(pass) {

    var decipher = crypto.createDecipheriv('aes-256-cbc', crypto.createHash('sha256').update(String('robertoRomero')).digest('base64').slice(0, 32), Buffer.alloc(16, 0));;
    var datosDesencriptados = decipher.update(pass, 'hex', 'utf8');
    datosDesencriptados += decipher.final('utf8');
    return datosDesencriptados;
}
module.exports = { encriptar,desencriptar };
