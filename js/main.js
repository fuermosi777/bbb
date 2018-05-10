'use strict';

(function(posts) {

    var KEYCODE = {
        ESC: 27,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40
    };

    var years = [];
    var yearMap = {};
    var i = 0;
    for (i; i < posts.length; i++) {
        if (!yearMap.hasOwnProperty(posts[i].year)) {
            years.push(posts[i].year);
            yearMap[posts[i].year] = true;
        }
    }

    var state = {
        posts,
        years,
        pid: null,
        year: null,
        date: null,
        showEmailModal: true
    };

    var yearListEl = document.querySelector('.year-list');
    var yearListItemsEl = document.querySelector('.year-list-items');
    var titleListEl = document.querySelector('.title-list');
    var mainPartEl = document.querySelector('.main-part');

    yearListItemsEl.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('year-title')) {
            var year = e.target.getAttribute('data-year');
            handleYearClick(year);
        }
    });

    titleListEl.addEventListener('mousedown', function(e) {
        var target = e.target;
        while (target && !target.classList.contains('post-title')) {
            target = target.parentNode;
        }

        var id = target.getAttribute('data-id');
        handleTitleClick(id);
    });

    document.addEventListener('mousedown', function(e) {
        if (e.target.className === 'close-post') {
            amplitude.getInstance().logEvent('Click Close Post');
            state.pid = null;
            render();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === KEYCODE.ESC) {
            state.pid = null;
            state.year = null;
            render();
        } else if (e.keyCode === KEYCODE.UP_ARROW) {
            if (state.pid) {
                var index = getPostIndex(state.pid);
                if (index === 0) return;
                if (posts[index - 1].year !== state.year) return;
                state.pid = posts[index - 1].id;
                render();
            } else if (state.year) {
                var index = getYearIndex(state.year);
                if (index === 0) return;
                state.year = years[index - 1];
                render();
            } else {
                state.year = years[years.length - 1];
                render();
            }
        } else if (e.keyCode === KEYCODE.DOWN_ARROW) {
            if (state.pid) {
                var index = getPostIndex(state.pid);
                if (index === posts.length - 1) return;
                if (posts[index + 1].year !== state.year) return;
                state.pid = posts[index + 1].id;
                render();
            } else if (state.year) {
                var index = getYearIndex(state.year);
                if (index === years.length - 1) return;
                state.year = years[index + 1];
                render();
            } else {
                state.year = years[0];
                render();
            }
        } else if (e.keyCode === KEYCODE.LEFT_ARROW) {
            if (state.pid) {
                state.pid = null;
                render();
            }
        } else if (e.keyCode === KEYCODE.RIGHT_ARROW) {
            if (!state.year) {
                state.year = years[0];
                render();
            } else if (!state.pid) {
                for (var i = 0; i < posts.length; i++) {
                    if (state.year === posts[i].year) {
                        state.pid = posts[i].id;
                        break;
                    }
                }
                render();
            }
        }
    });

    function getYearIndex(year) {
        for (var i = 0; i < years.length; i++) {
            if (years[i] === year) {
                return i;
            }
        }
    }

    function getPostIndex(id) {
        for (var i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                return i;
            }
        }
    }

    function handleYearClick(year) {
        amplitude.getInstance().logEvent('Click Year', {year});
        state.year = year;
        render();
    }

    function handleTitleClick(id) {
        amplitude.getInstance().logEvent('Click Title', {pid: id});
        state.pid = id;
        render();
    }

    function render() {
        // Restore init status
        yearListEl.className = 'year-list';
        yearListItemsEl.innerHTML = '';
        titleListEl.innerHTML = '';
        mainPartEl.innerHTML = '';

        // Year list
        if (state.pid) {
            yearListEl.classList.add('hidden');
        } else {
            years.forEach(function(year) {
                var yearTitleEl = document.createElement('div');
                yearTitleEl.className = 'year-title';
                yearTitleEl.textContent = year;
                yearTitleEl.setAttribute('data-year', year);
                if (state.year === year) {
                    yearTitleEl.classList.add('active');
                }
                yearListItemsEl.appendChild(yearTitleEl);
            });
        }

        // Title list
        posts.forEach(function(post) {
            if (post.year !== state.year) return;
            var titleEl = document.createElement('div');
            titleEl.className = 'post-title';
            titleEl.setAttribute('data-id', post.id);
            titleEl.innerHTML = `
                <span class="date-text">${post.date}</span>
                <span class="title-text">${post.title}</span>
            `;
            if (state.pid && state.pid === post.id) {
                titleEl.classList.add('active');
            }
            titleListEl.appendChild(titleEl);
            if (!state.pid) {
                titleListEl.scrollTop = 0;
            }
        });

        // Post
        var post;
        if (state.pid) {
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].id === state.pid) {
                    post = posts[i];
                    break;
                }
            }
        }

        if (state.pid) {
            var postEl = document.createElement('article');
            postEl.innerHTML = `
                <div class="post-content">${post.content}</div>
                <img class="close-post" src="/images/x.svg"/>
            `;
            mainPartEl.appendChild(postEl);
        }

        // Email modal
        

    }

    render();
})(posts);
