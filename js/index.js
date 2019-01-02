import "../css/index.scss";

import createElement from "./createElement";

// $ - when referring to real doms, e.g. $div, $el, $app
// v - when referring to virtual doms, e.g. vDiv, vEl, vApp

const vApp = createElement("div", { attrs: { id: "app" } });

console.log(vApp);
