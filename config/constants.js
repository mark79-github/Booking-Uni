module.exports = {
    constants: {
        USERNAME_MIN_LENGTH: 3,
        PASSWORD_MIN_LENGTH: 3,
        USERNAME_REGEX: /^[A-Za-z0-9]+$/,
        PASSWORD_REGEX: /^[A-Za-z0-9]+$/,
        FREE_ROOMS_MIN: 1,
        FREE_ROOMS_MAX: 100,
    },
    msg: {
        EMAIL_INVALID: "Email must be valid",
        WRONG_CREDENTIALS: "Wrong email and/or password",
        EMAIL_IS_IN_USE: (email) => {
            return `Email ${email} is already taken ...`
        },
        DB_CONNECTED: (host, name) => {
            return `Successfully connected to ${host} : db -> ${name}`
        },
        DB_CONNECTION_ERROR: "Connection error: ",
        APPLICATION_RUNNING: (port) => {
            return `Application is up & listening on port ${port} ...`;
        },
        USERNAME_ONLY_ALPHABETICAL: "Username must contain only digits and latin letters",
        CONFIRMATION_PASSWORD_ERROR: "Confirm password does not match",
        PASSWORD_ONLY_ALPHABETICAL: "Password must contain only digits and latin letters"
    }
}
