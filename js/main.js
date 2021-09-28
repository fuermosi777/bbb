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

var blacklist = [
  '67.188.2.177' // The Milpitas guy
]

function getip() {
  fetch('https://www.cloudflare.com/cdn-cgi/trace')
  .then(function(response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem when getting IP. Status Code: ' +
        response.status);
      return;
    }

    response.text().then(function(data) {
      data = data.trim().split('\n').reduce(function(obj, pair) {
        pair = pair.split('=');
        return obj[pair[0]] = pair[1], obj;
      }, {});
      
      if (data.ip && blacklist.indexOf(data.ip) > -1) {
        document.body.innerHTML = ''
      } else {
        console.log('You are good: ', data.ip);
      }
    });
  })
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

document.addEventListener("DOMContentLoaded", showDynamic);
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener("DOMContentLoaded", getip);