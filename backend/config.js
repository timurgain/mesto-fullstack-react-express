const config = {
  app: {
    port: 3000,
    name: 'express-mesto',
  },
  db: {
    uri: 'mongodb://localhost:27017/mestodb',
  },
  jwt: {
    secretKey: 'asdasd3esdwq23',
  },
};

module.exports = config;
