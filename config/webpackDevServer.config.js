"use strict";

const fs = require("fs");
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");
const ignoredFiles = require("react-dev-utils/ignoredFiles");
const redirectServedPath = require("react-dev-utils/redirectServedPathMiddleware");
const paths = require("./paths");
const getHttpsConfig = require("./getHttpsConfig");

const host = process.env.HOST || "0.0.0.0";
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/sockjs-node'
const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = function (proxy) {
  return {
    allowedHosts: "all",
    compress: true,
    hot: true,
    webSocketServer: "ws",
    devMiddleware: {
      publicPath: paths.publicUrlOrPath.slice(0, -1),
    },
    static: {
      directory: paths.appPublic,
      publicPath: paths.publicUrlOrPath,
      watch: {
        ignored: ignoredFiles(paths.appSrc),
      },
    },
    https: getHttpsConfig(),
    host,
    client: {
      logging: "none",
      overlay: false,
      webSocketURL: {
        hostname: sockHost,
        pathname: sockPath,
        port: sockPort,
      },
    },
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    proxy,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
      if (fs.existsSync(paths.proxySetup)) {
        require(paths.proxySetup)(devServer.app);
      }
      middlewares.push(
        evalSourceMapMiddleware(devServer),
        redirectServedPath(paths.publicUrlOrPath),
        noopServiceWorkerMiddleware(paths.publicUrlOrPath)
      );
      return middlewares;
    },
  };
};
