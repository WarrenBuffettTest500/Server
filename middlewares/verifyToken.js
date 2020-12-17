const RESPONSE = require('../constants/responses');
const { decode } = require('../utils/jwt');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const userInfo = decode(token);
    res.locals.userInfo = userInfo;

    next();
  } catch (error) {
    res.status(401).json({ result: RESPONSE.UNAUTHORIZED });
  }
};

module.exports = verifyToken;
