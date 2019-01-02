import "../css/index.scss";

import createElement from "./createElement";
import diff from "./diff";
import mount from "./mount";
import render from "./render";

// $ - when referring to real doms, e.g. $div, $el, $app
// v - when referring to virtual doms, e.g. vDiv, vEl, vApp

const createVApp = count =>
  createElement("div", {
    attrs: { id: "app", dataCount: count },
    children: [
      "That was easy",
      createElement("img", {
        attrs: { src: "https://mkio.link/easy" }
      }),
      createElement("br"),
      createElement("input", { type: "text" }),
      createElement("br"),
      "The current count is: ",
      String(count)
    ]
  });

let count = 0;
let vApp = createVApp(count);
const $app = render(vApp);
let $rootEl = mount($app, document.getElementById("app"));

setInterval(() => {
  count++;
  const vNewApp = createVApp(count);
  const patch = diff(vApp, vNewApp);

  $rootEl = patch($rootEl);

  vApp = vNewApp;
}, 1000);
