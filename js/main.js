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
  '67.188.2.177', // The Milpitas guy
  '180.111.48.125', // Nanjing
  '104.28.69.57', // Beijing iOS?
  '203.205.141.114', // Shenzhen
]

function blockIp() {
  fetch('https://www.cloudflare.com/cdn-cgi/trace')
  .then(function(response) {
    if (response.status !== 200) {
      let errorMessage = 'Looks like there was a problem when getting IP. Status Code: ' +
      response.status;
      console.log(errorMessage);
      if (mixpanel) {
        mixpanel.track("error-read-ip");
      }
      return;
    }

    response.text().then(function(data) {
      if (mixpanel) {
        mixpanel.track("ip-data", {data: data});
      }
      data = data.trim().split('\n').reduce(function(obj, pair) {
        pair = pair.split('=');
        return obj[pair[0]] = pair[1], obj;
      }, {});

      if (data.ip && blacklist.indexOf(data.ip) > -1) {
        document.body.innerHTML = ''
        if (mixpanel) {
          mixpanel.track("ip-blocked", { ip: data.ip });
        }
      } else {
        if (mixpanel) {
          mixpanel.track("ip-allowed", { ip: data.ip });
        }
      }
    });
  })
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function handleDocClick(e) {
  if (e.target.matches("article p img")) {
    e.target.classList.toggle('fs')
  }
}

document.addEventListener("DOMContentLoaded", showDynamic);
document.addEventListener("DOMContentLoaded", blockIp); 
// document.addEventListener("click", handleDocClick);