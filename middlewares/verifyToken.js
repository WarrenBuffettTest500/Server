const RESPONSE = require('../constants/response');
const { decode } = require('../utils/jwt');

const verifyToken = async (req, res, next) => {
  let token = req.get('authorization');

  try {
    const userInfo = decode(token);
    res.locals.userInfo = userInfo;

    next();
  } catch (error) {
    res.status(401).json({ result: RESPONSE.UNAUTHORIZED });
  }
};

module.exports = verifyToken;
