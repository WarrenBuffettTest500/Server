const hitService = require('../services/hit.service');
const { THIRTY_MINUTES } = require('../constants/numbers');

hitService.destroyOld(THIRTY_MINUTES);
