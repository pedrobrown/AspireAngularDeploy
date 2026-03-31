// Proxy configuration for Angular CLI dev server.
// Aspire injects the backend URL via the services__server__http__0 env variable.
const env = process.env;

const target =
  env['services__server__http__0'] ||
  env['services__server__https__0'] ||
  'http://localhost:5574';

const PROXY_CONFIG = [
  {
    context: ['/api'],
    target,
    secure: false,
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
