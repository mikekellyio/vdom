import "../css/index.scss";

import createElement from "./createElement";

// $ - when referring to real doms, e.g. $div, $el, $app
// v - when referring to virtual doms, e.g. vDiv, vEl, vApp

const vApp = createElement("div", {
  attrs: { id: "app" },
  children: [
    createElement("img", {
      attrs: { src: "https://mkio.link/easy" }
    })
  ]
});

console.log(vApp);
