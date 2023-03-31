function appendGIF(url) {
  const newImg = document.createElement("img");
  newImg.src = url;
  newImg.classList.add("gif");
  $('#gif-grid').append(newImg);
}