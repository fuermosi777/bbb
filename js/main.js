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

var ipBlacklist = [
  // The Milpitas guy
  '67.188.2.177',
  '172.225.87.*',

  // Nanjing - they learn to use VPN now.
  // '180.111.48.*',
  // '180.111.24.*',
  // '180.111.27.*',
  // '180.111.48.*',
  // '180.109.235.*',
  // '114.222.222.117',
  // '114.222.220.15',
  // '49.94.107.*',
  // '49.94.37.*',
  // '49.90.189.*',
  // '202.119.43.253',

  // Beijing / Guangzhou / iOS
  '104.28.69.*',
  '104.28.66.*',
  '104.28.83.*',
  '183.242.55.74',
  '103.144.148.217',
  '172.225.58.*',
  '111.197.239.76',
  '124.64.18.4',

  // Shenzhen
  '203.205.141.*',
  '27.46.9.133',
  '163.125.133.200'
]

var ipAllowedPathList = [
  '/',
  '/archive/'
]

function matchIp(rule, target) {
  var rules = rule.split('.');
  var targets = target.split('.');
  if (rules.length !== 4 || targets.length !== 4) {
    return true;
  }
  for (var i = 0; i < 4; i++) {
    if (rules[i] === '*') continue;
    if (rules[i] !== targets[i]) return false;
  }
  return true;
}

function blockIp() {
  // Don't check at homepage.
  if (ipAllowedPathList.indexOf(window.location.pathname) > -1) {
    return;
  }
  fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=be9fb33a118545e6a1f36a0327e3c890')
    .then(function (response) {
      if (response.status !== 200) {
        let errorMessage = 'Looks like there was a problem when getting IP. Status Code: ' +
          response.status;
        showBlockingSpinner();
        if (mixpanel) {
          mixpanel.track("error-read-ip", {error: errorMessage});
        }
        return;
      }

      response.json().then(function (data) {
        if (mixpanel) {
          mixpanel.track("ip-got", data);
        }

        var foundMatch = false;

        if (data.ip_address) {
          for (var i = 0; i < ipBlacklist.length; i++) {
            if (matchIp(ipBlacklist[i], data.ip_address)) {
              showBlockingSpinner();
              foundMatch = true;

              if (mixpanel) {
                data['match_rule'] = ipBlacklist[i];
                mixpanel.track("ip-blocked", data);
              }
            }
          }
        }

        if (!foundMatch && mixpanel) {
          mixpanel.track("ip-allowed", data);
        }
      });
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

function showBlockingSpinner() {
  document.querySelector('article').innerHTML = `<div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div>`;
}

function handleDocClick(e) {
  if (e.target.matches("article p img")) {
    e.target.classList.toggle('fs')
  }
}

document.addEventListener("DOMContentLoaded", showDynamic);
document.addEventListener("DOMContentLoaded", blockIp);
// document.addEventListener("click", handleDocClick);
