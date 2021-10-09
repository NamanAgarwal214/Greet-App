const AppError = require('./../utils/appError');

module.exports = (err, req, res, next) => {
    statusCode = err.statusCode || 500;
    status = err.status

    if(process.env.NODE_ENV === 'development'){
        res.status(statusCode).json({
            status,
            message: err.message
        })
    }
}