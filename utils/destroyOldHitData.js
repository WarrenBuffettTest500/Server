const hitService = require('../services/hit.service');

hitService.destroyOld(60 * 1000);
