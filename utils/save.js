const { CompanyProfile } = require('./models');

const save = async () => {
  const fs = require('fs');
  let rawdata = fs.readFileSync('./models/summarys.json');
  // let rawdata = fs.readFileSync('./models/summarys_2.json');
  let data = JSON.parse(rawdata);

  try {
    for (let i = 0; i < data.length; i++) {
      await CompanyProfile.create(data[i]);
      console.log(data.length);
      console.log(i, '만들어졌습니다');
    }
  } catch (error) {
    console.error(error);
  }
};
