const hitService = require('../services/hit.service');
const { ONE_HOUR } = require('../constants/numbers');

hitService.destroyOld(ONE_HOUR);
