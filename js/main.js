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

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function showDynamic() {
  let dynamicContentShow = getParameterByName('dc');
  if (dynamicContentShow) {
    let tags = document.querySelectorAll('.dynamic');
    for (let i = 0; i < tags.length; i++) {
      let tag = tags[i];
      if (tag.dataset.show === dynamicContentShow || tag.dataset.show === 'any') {
        tag.classList.remove('dynamic');
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", showDynamic);