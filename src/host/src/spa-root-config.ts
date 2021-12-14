import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@spa/header",
  app: () => System.import("//localhost:9001/spa-header.js"),
  activeWhen: ["/"]
});

registerApplication({
  name: "@spa/dashboard",
  app: () => System.import("//localhost:9002/spa-dashboard.js"),
  activeWhen: ["/"]
});

start({
  urlRerouteOnly: true
});
