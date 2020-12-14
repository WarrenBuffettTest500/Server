const hitService = require('../services/hit.service');

hitService.destroyOld(3 * 60 * 1000);
