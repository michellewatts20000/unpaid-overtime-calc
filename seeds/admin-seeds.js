const {
  Admin
} = require('../models');

const adminData = [{
    name: 'Michelle Watts',
    email: 'mwatts@unionsnsw.org.au',
    password: '123456Amazing',
  }

];

const seedAdmin = () =>
  Admin.bulkCreate(adminData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedAdmin;