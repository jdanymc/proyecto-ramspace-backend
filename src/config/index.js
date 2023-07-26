require('dotenv').config();

const config = {
    port:process.env.PORT || 3000,
    jwt_secret:process.env.JWT_SECRET || 'qwerty123'
}

module.exports = {config}