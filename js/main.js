"use strict";

(function() {

    var BIP = ['73.241.178.10'];

    // before load
    checkIP(blockIP);

    document.addEventListener('DOMContentLoaded', setHeroImage);

    function setHeroImage() {
        var date = new Date();
        var hash = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() + date.getHours().toString();
        document.querySelector('.hero img').src = '/images/hero/img' + (parseInt(hash % 36) + 1) + '.jpg';
    }

    function checkIP(done) {
        $.get("http://ipinfo.io", done, "jsonp");
    }

    function blockIP(response) {
        var e = document.body;
        if (BIP.indexOf(response.ip) >= 0) {
            mixpanelLoaded(function() {
                mixpanel.track('block', { request: response });
            });
            setTimeout(function() {
                window.location = '404';
            }, 1000);
        } else {
            e.classList.remove('block');
        }
    }

    var mixpanelFinder;
    function mixpanelLoaded(done) {
        mixpanelFinder = setInterval(function() {
            if (mixpanel !== undefined) {
                clearInterval(mixpanelFinder);
                done();
            }
        }, 300);
    }
})();
