"use strict";

(function() {

    console.info('Please don\'t do this.');

    // START

    var CORRECT = '098 071 103 120 078 068 085 052 079 084 069 121 077 119 061 061';

    var password = document.querySelector('.password');

    var input = password.querySelector('input');

    input.focus();

    input.addEventListener('keyup', function(e) {
        var value = input.value;

        if (value === atob(CORRECT.split(' ').map(code => String.fromCharCode(code)).join(''))) {
            password.parentNode.removeChild(password);
        }

        if (e.keyCode === 13) {
            mixpanel.track('password attempt', {password: value});
            input.value = '';
        }
    });

})();
