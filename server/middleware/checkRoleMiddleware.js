const jwt = require('jsonwebtoken');

module.exports = function (role) {
    return (
        function (req, res, next) {
            if (req.method === "OPTIONS") {
                next()
            }
            try {
                const token = req.headers.authorization.split(' ')[1] //Bearer token
                if(!token) {
                    res.status(401).json({message: 'Auth error'})
                }
                //проверяем токен на валидность
                const decoded = jwt.verify(token, process.env.SECRET_KEY);

                if(decoded.role !== role) {
                    return res.status(403).json({message: 'Sorry, нет доступа'})
                }
                req.user = decoded;
                next();
            }catch (e) {
                res.status(401).json({message: 'Sorry, не авторизован'})
            }
        }
    )
}
