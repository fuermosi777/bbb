'use strict';

var STORAGE_NAME_KEY = 'hcsh_visitor_name';

var _body = document.querySelector('body');
var _content = document.querySelector('.content');
var _modal = document.querySelector('.modal');
var _input = document.querySelector('input');

function checkAndShowModal() {
    var name = localStorage.getItem(STORAGE_NAME_KEY);
    if (name) {
        mixpanel.track('Visitor returned', {'value': name});
    } else {
        showModal();
        hideContent();
    }
}

function showModal() {
    _modal.classList.remove('hidden');
}

function hideModal() {
    _modal.classList.add('hidden');
}

function showContent() {
    _body.appendChild(_content);
}

function hideContent() {
    _body.removeChild(_content);
}

function handleEnterClick() {
    var nameValue = _input.value;
    if (!nameValue) return;
    if (
        // /[^\u4e00-\u9fa5]/.test(nameValue) ||
        // nameValue.length > 4 ||
        nameValue.length <= 2
    ) {
        _input.value = '';
    } else {
        localStorage.setItem(STORAGE_NAME_KEY, nameValue);
        mixpanel.track('Visitor name entered', {'value': nameValue});
        hideModal();
        showContent();
    }
}

document.addEventListener('DOMContentLoaded', checkAndShowModal);
