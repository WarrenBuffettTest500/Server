const userService = require('../services/user.service');
const RESPONSE = require('../constants/responses');
const { decode } = require('../utils/jwt');

exports.getCurrentUser = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = decode(token);
    const user = await userService.findByEmail(decoded.email);

    res.status(200).json({
      result: RESPONSE.OK, user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  const preferenceInfoId = req.body.preferenceInfo.id;
  const userUid = req.params.user_id;

  try {
    const updatedUser = await userService.updateUserPreferenceInfoId(userUid, preferenceInfoId);

    res.status(200).json({
      result: RESPONSE.OK,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
