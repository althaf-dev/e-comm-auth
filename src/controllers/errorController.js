class AuthError extends Error {
    static MESSAGES = {
        INVALIDCREDENTIALS: 'required username or password',
        USERNOTFOUND: "user not found !",
        INVALIDPASSWORD: 'invalid username or password',
        USEREXIST: 'user exist',
        AUTHFAILED: 'Authentication failed'
    };

    constructor(message, status) {
        super(message);
        (this.name = 'AuthError'), (this.status = status);
    }
}

function errorHandler(err, req, res, next) {
   
    const { accept } = req.headers;
    console.log('erro handler called',err);
    if (accept === 'application/json' || accept === "*/*") {
        res.status(err.status).send({
            error: err.message,
        });
    } else {
        console.log(err)
        // res.redirect(
        //     `/refresh?redirect=${encodeURIComponent(req.originalUrl)}`
        // );
    }
}

function asyncHandler(fn){
    return (req,res,next)=>{
        return Promise.resolve(fn(req,res)).catch(next)
    }
}

module.exports = { errorHandler, AuthError,asyncHandler };
