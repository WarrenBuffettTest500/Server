const userService = require('../services/user.service');
const portfolioItemService = require('../services/portfolioItem.service');

const convertPortfolioToTable = portfolio => {
  const table = {};

  portfolio.forEach(item => {
    table[item.symbol] = Number(item.avgPrice) * Number(item.quantity);
  });

  return table;
};

const calculateLength = portfolioTable => {
  let lengthSquared = 0;

  for (const company in portfolioTable) {
    lengthSquared += portfolioTable[company] ** 2;
  }

  return Math.sqrt(lengthSquared);
};

const calculateCosineSimilaritiesByPortfolio = async userUid => {
  const users = await userService.getAll();
  const otherUsers = users.filter(user => user.uid !== userUid);
  const basePortfolio = await portfolioItemService.getOne(userUid);
  const basePortfolioTable = convertPortfolioToTable(basePortfolio);
  const baseLength = calculateLength(basePortfolioTable);

  const portfoliosWithSimilarities = await Promise.all(
    otherUsers.map(async user => {
      const comparingPortfolio = await portfolioItemService.getOne(user.uid);
      const comparingPortfolioTable = convertPortfolioToTable(comparingPortfolio);
      let dotProduct = 0;
      let comparingLengthSquared = 0;

      for (const company in comparingPortfolioTable) {
        if (basePortfolioTable.hasOwnProperty(company)) {
          dotProduct += basePortfolioTable[company] * comparingPortfolioTable[company];
        }

        comparingLengthSquared += comparingPortfolioTable[company] ** 2;
      }

      const magnitude = baseLength * Math.sqrt(comparingLengthSquared);
      const similarity = dotProduct / magnitude;

      return {
        owner: user.uid,
        similarity,
        items: comparingPortfolio,
      };
    }),
  );

  return portfoliosWithSimilarities.sort((a, b) => b.similarity - a.similarity);
};

module.exports = calculateCosineSimilaritiesByPortfolio;
