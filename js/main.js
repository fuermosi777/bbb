"use strict";

(function() {

    console.info('Please don\'t do this.');

    // START

    var CORRECT = 'hao';

    var password = document.querySelector('.password');

    var input = password.querySelector('input');

    input.focus();

    input.addEventListener('keypress', function(e) {
        var value = input.value;

        if (value === CORRECT) {
            password.parentNode.removeChild(password);
        }

        if (e.keyCode === 13) {
            mixpanel.track('password attempt', {password: value});
            input.value = '';
        }
    });

})();
