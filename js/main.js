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

function getHashTag() {
  if (window.location.hash) {
    return window.location.hash.substring(1);
  }
  return "";
}

function showDynamic() {
  let hashTag = getHashTag();
  if (hashTag) {
    let tags = document.querySelectorAll(".hidden");
    for (let i = 0; i < tags.length; i++) {
      let tag = tags[i];
      if (tag.dataset.show === hashTag || tag.dataset.show === "any") {
        tag.classList.remove("hidden");
      } else {
        tag.parentNode.removeChild(tag);
      }
    }
    // If found hashtag in current path. Append it on-the-fly.
    let links = document.querySelectorAll("a");
    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      link.href += "#" + hashTag;
    }
  }
}

function showFeather() {
  if (feather) {
    feather.replace();
  }
}

document.addEventListener("DOMContentLoaded", showDynamic);
document.addEventListener("DOMContentLoaded", showFeather);
