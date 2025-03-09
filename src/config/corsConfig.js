const allowedOrigins = process.env.ALLOWEDORIGINS?.split(',');
function corsConfig(req, res, next) {
    try {
        if (allowedOrigins.includes(req.headers.origin) || !req.headers.origin) {
            res.setHeader('Access-Control-Allow-Origin', req.headers?.origin || 'http://localhost:5173/');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
            res.setHeader(
                'Access-Control-Allow-Headers',
                'Content-Type, Authorization'
            );
            if (req.method === 'options') {
                return res.sendStatus(204);
            }
            next();
        } else {
            throw new Error('not allowed by cors');
        }
    } catch (e) {
        console.log(e.message);
        next({ status: 403, message: e.message });
    }
}
module.exports = corsConfig;
