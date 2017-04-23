"use strict";

(function() {

    console.info('Please don\'t do this.');

    // START

    var CORRECT = 'hao';

    var password = document.querySelector('.password');

    var input = password.querySelector('input');

    input.focus();

    input.addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
            var value = input.value;

            mixpanel.track('password attempt', {password: value});

            if (value === CORRECT) {
                password.parentNode.removeChild(password);
            } else {
                input.value = '';
            }
        }
    });

})();
