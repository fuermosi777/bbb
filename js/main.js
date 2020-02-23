"use strict";

// Load Disqus script and remove show-disqus button if exists.
function showDisqus() {
  var d = document,
    s = d.createElement("script");
  s.src = "https://wan-an-di-qiu.disqus.com/embed.js";
  s.setAttribute("data-timestamp", +new Date());
  (d.head || d.body).appendChild(s);

  var button = d.getElementById("show-disqus");
  if (button) {
    button.parentElement.removeChild(button);
  }
}
