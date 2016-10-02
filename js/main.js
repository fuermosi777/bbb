"use strict";

(function() {
    document.addEventListener('DOMContentLoaded', setHeroImage);

    function setHeroImage() {
        var date = new Date();
        var hash = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() + date.getHours().toString();
        document.querySelector('.hero img').src = '/images/hero/img' + (parseInt(hash % 36) + 1) + '.jpg';
    }
})();