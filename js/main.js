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
        showEmailModal: true,
        titleListScrollTop: 0,
        isEmailEntered: false
    };

    var rootEl = document.querySelector('.journal');

    document.addEventListener('touchend', handleAction)

    document.addEventListener('click', handleAction);

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

    /**
     * @param {Event} e
     */
    function handleAction(e) {
        if (e.target.className === 'close-post') {
            e.stopPropagation();
            state.pid = null;
            render();
        }
        if (e.target.classList.contains('year-title')) {
            e.stopPropagation();
            var year = e.target.getAttribute('data-year');
            handleYearClick(year);
        }
        if (e.target.classList.contains('post-title') ||
            e.target.classList.contains('date-text') ||
            e.target.classList.contains('title-text')) {
            e.stopPropagation();
            var id = e.target.getAttribute('data-id');
            handleTitleClick(id);
        }
    }

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

    function createDom(tag, className) {
        var el = document.createElement(tag);
        el.className = className;
        return el;
    }

    function handleYearClick(year) {
        amplitude.getInstance().logEvent('Click Year', {year});
        state.pid = null;
        state.year = year;
        state.titleListScrollTop = 0;
        render();
    }

    function handleTitleClick(id) {
        amplitude.getInstance().logEvent('Click Title', {pid: id});
        state.pid = id;
        render();
    }

    function render() {
        rootEl.innerHTML = '';
        var yearListEl = createDom('div', 'year-list');
        var sideBarEl = createDom('div', 'side-bar');
        var titleListEl = createDom('div', 'title-list');
        var mainPartEl = createDom('div', 'main-part');

        yearListEl.innerHTML = `<div class="logo"><a href="/">hcsh</a></div>`;

        // Year list
        years.forEach(function(year) {
            var yearTitleEl = document.createElement('div');
            yearTitleEl.className = 'year-title';
            yearTitleEl.textContent = year;
            yearTitleEl.setAttribute('data-year', year);
            if (state.year === year) {
                yearTitleEl.classList.add('active');
            }
            yearListEl.appendChild(yearTitleEl);
        });

        // Title list
        posts.forEach(function(post) {
            if (post.year !== state.year) return;
            var titleEl = document.createElement('div');
            titleEl.className = 'post-title';
            titleEl.setAttribute('data-id', post.id);
            titleEl.innerHTML = `
                <span class="date-text" data-id="${post.id}">${post.date}</span>
                <span class="title-text" data-id="${post.id}">${post.title}</span>
            `;
            if (state.pid && state.pid === post.id) {
                titleEl.classList.add('active');
            }
            titleListEl.appendChild(titleEl);
            if (!state.pid) {
                titleListEl.scrollTop = 0;
            }

        });
        titleListEl.addEventListener('scroll', function(e) {
            state.titleListScrollTop = titleListEl.scrollTop;
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

        // Add stuff
        sideBarEl.appendChild(yearListEl);

        if (state.year) {
            sideBarEl.appendChild(titleListEl);
        }

        rootEl.appendChild(sideBarEl);
        rootEl.appendChild(mainPartEl);

        if (!state.pid) {
            mainPartEl.classList.add('mobile-hidden');
        }

        titleListEl.scrollTop = state.titleListScrollTop;
    }

    render();
})(posts);
