'use strict';

(function() {
    // function loadPage(pwd) {
    //     let hash= Sha1.hash(pwd);
    //     let url = hash + '/index.html';
            
    //     $.ajax({
    //         url : url,
    //         dataType : 'html',
    //         success : function(data) {
    //             mixpanel.track('correct password');

    //             window.location = url;
    //         },
    //         error : function(xhr, ajaxOptions, thrownError) {
    //             mixpanel.track('false password', {password: pwd});

    //             $('.password-input').val('');
    //         }
    //     });
    // }

    // $('.password-input').keypress(function(e) {
    //     if (e.which == 13) {
    //         loadPage($('.password-input').val());
    //     }
    // });

    // $('.password-input').focus();

    $('.year-title').on('click', function(e) {
        var year = $(this).data('year');
        var el = $('.post-title[data-year=' + year + ']');
        var isHidden = el.hasClass('hidden');
        $('article').addClass('hidden');
        $('.post-title').addClass('hidden');

        if (isHidden) {
            el.removeClass('hidden');
        } else {
            el.addClass('hidden');
        }
    });

    $('.post-title').on('click', function(e) {
        var pid = $(this).data('pid');
        var el = $('article[data-pid="' + pid + '"]');
        var isHidden = el.hasClass('hidden');
        $('article').addClass('hidden');

        if (isHidden) {
            mixpanel.track('view post', { pid: pid });
            el.removeClass('hidden');
        } else {
            el.addClass('hidden');
        }
    });
})();
