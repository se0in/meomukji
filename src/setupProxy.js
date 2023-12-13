/* const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://211.237.50.150:7080',
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
}; */