"use strict";

(function() {

    var BIP = ['73.241.178.10'];

    // before load
    checkIP(blockIP);
    identifyUser();

    // document.addEventListener('DOMContentLoaded', setHeroImage);

    function genID() {
        var text = "";
        var possible = "1234567890";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;

    }

    function setHeroImage() {
        var date = new Date();
        var hash = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() + date.getHours().toString();
        var img = document.querySelector('.hero img');
        if (img) document.querySelector('.hero img').src = '/images/hero/img' + (parseInt(hash % 36) + 1) + '.jpg';
    }

    function checkIP(done) {
        $.get("http://ipinfo.io", done, "jsonp");
    }

    function blockIP(response) {
        var e = document.body;
        if (BIP.indexOf(response.ip) >= 0) {
            mixpanel.track('block', { request: response });
            setTimeout(function() {
                window.location = '404';
            }, 1000);
        } else {
            e.classList.remove('block');
        }
    }


    function identifyUser() {
        var s = localStorage;
        var id = s.getItem('uid');
        if (id !== null) {
            mixpanel.alias(id);
        } else {
            id = genID();
            s.setItem('uid', id);
            mixpanel.identify(id);
        }
    }

})();
