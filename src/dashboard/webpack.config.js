const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "spa",
    projectName: "dashboard",
    webpackConfigEnv,
    argv
  });

  return merge(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.module.css$/i,
          use: ["style-loader", "css-loader"]
        }
      ]
    }
  });
};
