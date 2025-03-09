const jwt = require('jsonwebtoken');
const config = require("../config/config")

function generateToken(user, type) {
    let token;
    if (type === 'Access') {
        token = jwt.sign(
            { userId: user._id.toString(), username: user.username },
             config.ACCEES_TOKEN_KEY,
            {
                expiresIn: '1m',
            }
        );
    } else {
        token = jwt.sign(
            { userId: user?._id.toString(),username: user.username  },
             config.REFRESH_TOKEN_KEY,
            {
                expiresIn: '10m'
            }
        );
    }

    return token;
}

function getUser(req) {
    const { accessToken } = req.cookies;
    console.log('token from getUser', accessToken);
    try {
        const decoded = jwt.verify(accessToken,config.ACCEES_TOKEN_KEY);
        console.log(decoded);
        if (decoded) return decoded.userName;
        else return null;
    } catch (e) {
        return null;
    }
}

function getRedirectURL(req) {
    return req.query?.redirect ? decodeURIComponent(req.query.redirect) : '/';
}

function setAuthCookies(res, accessToken, refreshToken) {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 120000,
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
    });
}

function handleSuccessResponse(req, res, responseDto, redirectTo) {
    const { accept } = req.headers;
    if (accept === 'application/json')
        res.status(200).json(responseDto);
    else res.redirect(redirectTo);
}



function verifyJWT(refreshToken){
  
  const decodedRefresh = jwt.verify(refreshToken,process.env.REFRESHTOKEN);
  if(decodedRefresh){
    return (
      {
        _id: decodedRefresh.userId,
        username: decodedRefresh.username 
      }
    )
  }
}
module.exports = {
    generateToken,
    getUser,
    getRedirectURL,
    setAuthCookies,
    handleSuccessResponse,
    verifyJWT
};
