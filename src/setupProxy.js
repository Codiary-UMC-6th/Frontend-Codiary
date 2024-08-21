const { legacyCreateProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/bookmarks",
    legacyCreateProxyMiddleware({
      target: "http://43.202.229.89:8080",
      changeOrigin: true,
    })
  );
  app.use(
    "/posts",
    legacyCreateProxyMiddleware({
      target: "http://43.202.229.89:8080",
      changeOrigin: true,
    })
  );
  app.use(
    "/members",
    legacyCreateProxyMiddleware({
      target: "http://43.202.229.89:8080",
      changeOrigin: true,
    })
  );
  app.use(
    "/teams",
    legacyCreateProxyMiddleware({
      target: "http://43.202.229.89:8080",
      changeOrigin: true,
    })
  );
  app.use(
    "/calendar",
    legacyCreateProxyMiddleware({
      target: "http://43.202.229.89:8080",
      changeOrigin: true,
    })
  );
};
