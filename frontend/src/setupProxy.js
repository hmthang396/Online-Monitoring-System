const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/Account/login", {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/Account", {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/Account/Logout", {
      target: 'http://localhost:4000',
      changeOrigin: true,
      headers: {
        accept: "application/json",
        method: "POST",
      },
    })
  );
};