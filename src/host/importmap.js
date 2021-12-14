console.log("importmap file loaded ...");

const scriptEl = document.createElement("script");
scriptEl.type = "systemjs-importmap";
scriptEl.textContent = `
{
 "imports": {
   "react": "https://unpkg.com/react@17/umd/react.development.js",
   "react-dom": "https://unpkg.com/react-dom@17/umd/react-dom.development.js",
   "@spa/root-config": "http://localhost:9000/spa-root-config.js"
  }
}
`;
document.head.appendChild(scriptEl);
//"@spa/header": "http://localhost:8080/spa-header.js"
