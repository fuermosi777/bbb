'use strict';

(function() {
    function loadPage(pwd) {
        let hash= Sha1.hash(pwd);
        let url = hash + '/index.html';
            
        $.ajax({
            url : url,
            dataType : 'html',
            success : function(data) {
                mixpanel.track('correct password');

                window.location = url;
            },
            error : function(xhr, ajaxOptions, thrownError) {
                mixpanel.track('false password', {password: pwd});

                $('.password-input').val('');
            }
        });
    }

    $('.password-input').keypress(function(e) {
        if (e.which == 13) {
            loadPage($('.password-input').val());
        }
    });

    $('.password-input').focus();
})();
