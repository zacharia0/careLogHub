const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error(err.stack); // Log the full error for debugging purposes

    res.status(statusCode).json({
        success: false,
        message,
    });
};

module.exports = errorHandler;
