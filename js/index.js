import "../css/index.scss";

import createElement from "./createElement";
import mount from "./mount";
import render from "./render";

// $ - when referring to real doms, e.g. $div, $el, $app
// v - when referring to virtual doms, e.g. vDiv, vEl, vApp

const vApp = createElement("div", {
  attrs: { id: "app" },
  children: [
    "That was easy",
    createElement("img", {
      attrs: { src: "https://mkio.link/easy" }
    })
  ]
});

const $app = render(vApp);
console.log($app);

mount($app, document.getElementById("app"));
