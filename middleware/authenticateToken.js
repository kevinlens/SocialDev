const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get Token from header
  const token = req.header('x-auth-token');

  //Check if token exist
  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied',
    });
  }
  //Verify token is legit and not expired
  try {
    //pass in the header token with your jwtSecret and destructure into...
    // {
    //     user: { id: '5f225b65fd00cf2cb0fb17f3' },
    //     iat: 1596087141,
    //     exp: 1596447141
    // }
    const decoded = jwt.verify(
      token,
      config.get('jwtSecret')
    );
    //making req.user be the id for later usage
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid',
    });
  }
};
