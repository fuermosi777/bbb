'use strict';

function getComments() {
  var comments = [];
  var path = document.location.pathname;
  firestore.collection('comments').where('path', '==', path)
    // .orderBy('date')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        comments.push(doc.data());
      });
      renderComments(comments);
    })
    .catch(function(error) {
      console.log("Error getting comments: ", error);
    });
}

function renderComments(comments) {
  var _comments = document.querySelector('.comments');
  if (!_comments) return;

  _comments.innerHTML = '';

  var _list = document.createElement('ul');

  comments.forEach(function(comment) {
    var _item = document.createElement('li');
    _item.innerHTML = '' +
      '<div class="comment-meta">' +
        '<span>' + comment.name + '</span>' +
        '<span>' + new Date(comment.date.seconds * 1000).toLocaleDateString() + '</span>' +
      '</div>' +
      '<div class="comment-content">' + comment.content + '</div>' +
    '';
    _list.appendChild(_item);
  });
  _comments.appendChild(_list);
}

function makeComment() {
  var name = document.querySelector('.comment-input-name').value;
  var content = document.querySelector('.comment-input-content').value;
  if (!name || !content) return;
  firestore.collection('comments').add({
    name: name,
    content: content,
    path: document.location.pathname,
    date: new Date(),
  })
  .then(function(docRef) {
    console.log("Comment written with ID: ", docRef.id);
    getComments();
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}

document.addEventListener('DOMContentLoaded', getComments);
