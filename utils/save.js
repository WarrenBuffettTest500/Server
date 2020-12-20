const { User, PreferenceInfo, PortfolioItem, CompanyProfile } = require('../models');

const save = async () => {
  const fs = require('fs');
  const companyProfileRawData1 = fs.readFileSync('./models/summarys.json');
  const companyProfileRawData2 = fs.readFileSync('./models/summarys_2.json');
  const companyProfileData1 = JSON.parse(companyProfileRawData1);
  const companyProfileData2 = JSON.parse(companyProfileRawData2);
  const userRawData = fs.readFileSync('./models/userMockUpData.json');
  const userRawData2 = fs.readFileSync('./models/userMockUpData2.json');
  const userData = JSON.parse(userRawData);
  const userData2 = JSON.parse(userRawData2);
  const preferenceInfoRawData = fs.readFileSync('./models/preferenceInfoMockUpData.json');
  const preferenceInfoRawData2 = fs.readFileSync('./models/preferenceInfoMockUpData2.json');
  const preferenceInfoData = JSON.parse(preferenceInfoRawData);
  const preferenceInfoData2 = JSON.parse(preferenceInfoRawData2);
  const portfolioItemRawData = fs.readFileSync('./models/portfolioItemMockUpData.json');
  const portfolioItemRawData2 = fs.readFileSync('./models/portfolioItemMockUpData2.json');
  const portfolioItemData = JSON.parse(portfolioItemRawData);
  const portfolioItemData2 = JSON.parse(portfolioItemRawData2);

  try {
    for (let i = 0; i < companyProfileData1.length; i++) {
      await CompanyProfile.create(companyProfileData1[i]);
      console.log(i + 1, companyProfileData1.length);
    }

    for (let i = 0; i < companyProfileData2.length; i++) {
      await CompanyProfile.create(companyProfileData2[i]);
      console.log(i + 1, companyProfileData2.length);
    }

    for (let i = 0; i < userData.length; i++) {
      await User.create(userData[i]);
      console.log(i + 1, userData.length);
    }

    for (let i = 0; i < userData2.length; i++) {
      await User.create(userData2[i]);
      console.log(i + 1, userData2.length);
    }

    for (let i = 0; i < preferenceInfoData.length; i++) {
      await PreferenceInfo.create(preferenceInfoData[i]);
      console.log(i + 1, preferenceInfoData.length);
    }

    for (let i = 0; i < preferenceInfoData2.length; i++) {
      await PreferenceInfo.create(preferenceInfoData2[i]);
      console.log(i + 1, preferenceInfoData2.length);
    }

    for (let i = 0; i < portfolioItemData.length; i++) {
      await PortfolioItem.create(portfolioItemData[i]);
      console.log(i + 1, portfolioItemData.length);
    }

    for (let i = 0; i < portfolioItemData2.length; i++) {
      await PortfolioItem.create(portfolioItemData2[i]);
      console.log(i + 1, portfolioItemData2.length);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = save;
