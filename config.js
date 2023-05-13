module.exports = {
    port: process.env.PORT || 3000,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    dbUser: process.env.USER,
    dbPassword: process.env.PSSWRD,
    secretKey: process.env.SECRET_KEY,
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromPhone: process.env.FROM_PHONE,
}