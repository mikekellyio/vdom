import "../css/index.scss";

import createElement from "./createElement";
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
      "The current count is: ",
      String(count)
    ]
  });

let count = 0;
const vApp = createVApp(count);
const $app = render(vApp);
let $rootEl = mount($app, document.getElementById("app"));

setInterval(() => {
  count++;
  $rootEl = mount(render(createVApp(count)), $rootEl);
}, 1000);
