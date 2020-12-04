const userService = require('../service/userService');
const { encode } = require('../utils/jwt');
const RESPONSE = require('../constants/response');

exports.loginUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const { dataValues: user } = await userService.login(email);

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
    const { dataValues: user } = await userService.login(email);

    if (user) {
      const token = encode(user);

      res.status(200).json({ result: RESPONSE.FAILURE, user, token });
      return;
    }

    const { dataValues: createdUser } = await userService.signup(userInfo);
    const token = encode(createdUser);

    res.status(201).json({ result: RESPONSE.OK, createdUser, token });
  } catch (error) {
    next(error);
  }
};
