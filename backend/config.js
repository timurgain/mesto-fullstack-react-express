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
  cors: {
    allowOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://timur.nomoredomains.monster',
      'http://www.timur.nomoredomains.monster',
      'https://timur.nomoredomains.monster',
      'https://www.timur.nomoredomains.monster',
    ],
    allowMethods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  },
};

module.exports = config;
