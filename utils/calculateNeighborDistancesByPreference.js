const { PreferenceInfo } = require('../models');

const calculateNeighborDistancesByPreference = async userUid => {
  const preferenceInfos = await PreferenceInfo.findAll();
  const basePreferenceInfo = preferenceInfos.find(preferenceInfo => preferenceInfo.userUid === userUid);
  const comparitiveGroup = preferenceInfos.filter(preferenceInfo => preferenceInfo.userUid !== userUid);
  const baseInterestedSectorArray = [basePreferenceInfo.interestedSector1, basePreferenceInfo.interestedSector2, basePreferenceInfo.interestedSector3];
  const baseInterestedSectorTable = {};

  baseInterestedSectorArray.forEach(sector => {
    if (!baseInterestedSectorTable.hasOwnProperty(sector)) {
      baseInterestedSectorTable[sector] = 0;
    }

    baseInterestedSectorTable[sector]++;
  });

  const interestedSectorSimilarityScore = {
    '0': 4,
    '1': 2.67,
    '2': 1.33,
    '3': 0,
  };

  const riskAppetitePoints = {
    high: 5,
    medium: 3,
    low: 1,
  };

  const stockProportionPoints = {
    below20: 1,
    below40: 2,
    below60: 3,
    below80: 4,
    above80: 5,
  };

  const preferredStockTypePoints = {
    growth: 5,
    dividends: 1,
  };

  const periodPoints = {
    short: 1,
    mid: 2.33,
    long: 3.67,
    'very-long': 5,
  };

  const distances = [];

  comparitiveGroup.forEach(preferenceInfo => {
    const baseInterestedSectors = JSON.parse(JSON.stringify(baseInterestedSectorTable));
    const otherInterestedSectorArray = [preferenceInfo.interestedSector1, preferenceInfo.interestedSector2, preferenceInfo.interestedSector3];
    let interestedSectorMatchCount = 0;

    for (let i = 0; i < otherInterestedSectorArray.length; i++) {
      if (baseInterestedSectors[otherInterestedSectorArray[i]]) {
        interestedSectorMatchCount++;
        baseInterestedSectors[otherInterestedSectorArray]--;
      }
    }

    let distance = interestedSectorSimilarityScore[interestedSectorMatchCount.toString()] ** 2;

    distance += (riskAppetitePoints[basePreferenceInfo.riskAppetite] - riskAppetitePoints[preferenceInfo.riskAppetite]) ** 2;
    distance += (stockProportionPoints[basePreferenceInfo.stockProportion] - stockProportionPoints[preferenceInfo.stockProportion]) ** 2;
    distance += (preferredStockTypePoints[basePreferenceInfo.preferredStockType] - preferredStockTypePoints[preferenceInfo.preferredStockType]) ** 2;
    distance += (periodPoints[basePreferenceInfo.period] - periodPoints[preferenceInfo.period]) ** 2;

    distances.push({ userUid: preferenceInfo.userUid, distance });
  });

  return distances.sort((a, b) => a.distance - b.distance);
};

module.exports = calculateNeighborDistancesByPreference;
