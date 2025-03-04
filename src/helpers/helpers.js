const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user, type) {
    let token;
    if (type === 'Access') {
        token = jwt.sign(
            { userId: user._id.toString(), username: user.username },
            process.env.ACCESSTOKEN,
            {
                expiresIn: '1m',
            }
        );
    } else {
        token = jwt.sign(
            { userId: user._id.toString(),username: user.username  },
            process.env.REFRESHTOKEN,
            {
                expiresIn: '10m',
            }
        );
    }

    return token;
}

function getUser(req) {
    const { accessToken } = req.cookies;
    console.log('token from getUser', accessToken);
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESSTOKEN);
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

function validateCredentials(req) {
    const { username, password } = req.body;
    if (username === '' || password === '') return false;
    else return true;
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

function handleLoginSuccess(req, res, accessToken, user, redirectTo) {
    const { accept } = req.headers;
    if (accept === 'application/json')
        res.status(200).send({
            accessToken: accessToken,
            user: user?.username,
            imageUrl:"http://localhost:8000/public/profiles/1741048192309.jpg"
        });
    else res.redirect(redirectTo);
}

function handleSignupSuccess(req, res) {
    if (req.headers['content-type'] === 'application/json')
        res.status(201).send({ message: 'user created successfully' });
    else res.redirect('/');
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
    validateCredentials,
    setAuthCookies,
    handleLoginSuccess,
    handleSignupSuccess,
    verifyJWT
};
