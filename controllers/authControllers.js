const userService = require('../service/userService');
const { encode } = require('../utils/jwt');
const RESPONSE = require('../constants/response');

exports.loginUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await userService.login(email);

    if (!user) {
      res.status(200).json({ result: RESPONSE.FAILURE });
      return;
    }

    const token = encode(user);
    res.status(200).json({ result: RESPONSE.OK, user, token });
  } catch (error) {
    next(error);
  }
};

exports.registerUser = async (req, res, next) => {
  const userInfo = req.body;

  try {
    const user = await userService.login(userInfo.email);

    if (user) {
      const token = encode(user);

      res.status(200).json({ result: RESPONSE.FAILURE, user, token });
    } else {
      const user = await userService.signup(userInfo);
      const token = encode(createdUser);
  
      res.status(201).json({ result: RESPONSE.OK, user, token });
    }
  } catch (error) {
    next(error);
  }
};
