function appendGIF(url) {
  const newImg = document.createElement("img");
  newImg.src = url;
  newImg.classList.add("gif");
  $('#gif-grid').append(newImg);
}

async function getGIF(searchTerm) {
  const res = await axios.get('https://api.giphy.com/v1/gifs/search', { params: {
    q: searchTerm,
    api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'}
    });
  const newData = res.data.data;
  const number = newData.length;
  const i = Math.floor(Math.random() * number);
  console.log(i)
  const fullUrl = res.data.data[i].images.original.url
  const gifUrl = fullUrl.substring(0, fullUrl.indexOf(".gif") + 4);
  appendGIF(gifUrl);
}

$("#remove-btn").click(() => {
  $('.gif').remove()
});

const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = document.querySelector("#gif-search-term").value;
  if (searchTerm.length > 0 ) {
    getGIF(searchTerm);
  } else {
    alert("Enter a search term!");
  }
});