const userService = require('../services/user.service');
const { encode } = require('../utils/jwt');
const RESPONSE = require('../constants/responses');

exports.generateToken = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await userService.findByEmail(email);

    if (!user) {
      res.status(200).json({
        result: RESPONSE.FAILURE,
      });

      return;
    }

    const token = encode(user);

    res.status(200).json({
      result: RESPONSE.OK,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.registerUser = async (req, res, next) => {
  const userInfo = req.body;

  try {
    const user = await userService.findByEmail(userInfo.email);

    if (user) {
      const token = encode(user);

      res.status(200).json({
        result: RESPONSE.OK,
        user,
        token,
        message: RESPONSE.ALREADY_SIGNED_UP,
      });
    } else {
      const user = await userService.create(userInfo);
      const token = encode(user);

      res.status(201).json({
        result: RESPONSE.OK,
        user,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};
