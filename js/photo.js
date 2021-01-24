var photos = [
  "https://user-images.githubusercontent.com/7303373/105619038-5316fd00-5da3-11eb-81ac-57becc189dcd.png",
  "https://user-images.githubusercontent.com/7303373/105619035-44c8e100-5da3-11eb-9451-25bb1462078c.png",
];

function showPhotos() {
  let photoEl = document.querySelector(".photo");
  if (photoEl) {
    photos.forEach(function (photo) {
      var img = document.createElement("img");
      img.src = photo;
      img.className = "xxpic";
      photoEl.appendChild(img);
    });
  }
}

document.addEventListener("DOMContentLoaded", showPhotos);
