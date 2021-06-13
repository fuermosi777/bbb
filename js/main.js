"use strict";

function getHashTag() {
  if (window.location.hash) {
    return window.location.hash.substring(1);
  }
  return "";
}

function showDynamic() {
  let hashTag = getHashTag();

  let tags = document.querySelectorAll(".hidden");
  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i];
    if (tag.dataset.show === hashTag || tag.dataset.show === "") {
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

function showFeather() {
  if (feather) {
    feather.replace();
  }
}

document.addEventListener("DOMContentLoaded", showDynamic);
document.addEventListener("DOMContentLoaded", showFeather);
