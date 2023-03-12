$('#submit-btn').on("click", function(evt){
  evt.preventDefault();
  if($('#movie-name').val().length < 2) {
    alert("Movie name is too short!");
    return;
  }
  if($('#rating').val() < 0 || $('#rating').val() > 10 || $('#rating').val() === '') {
    alert("Enter a rating between 0 and 10!");
    return;
  }
  $('.movie-table-body').append(`<tr><td>${$('#movie-name').val()}</td><td>${$('#rating').val()}</td><td><button class="delete-row-btn" type="button">Delete Movie</button></td></tr>`);
  $('#movie-name').val('')
  $('#rating').val('')
});

$('.movie-table-body').on("click", ".delete-row-btn", function(evt) {
  evt.target.parentElement.parentElement.remove();
});

$('.movie-table-header').on("click", "th", function(evt) {
  if($('.movie-table-body').children().length === 0) {
    console.log("no rows to sort");
    return;
  }
  if (evt.target.id === 'delete-btn-header') {
    console.log("nothing to do");
    return;
  }

  if (evt.target.classList.contains("ascending")) {
    evt.target.classList.remove("ascending");
    evt.target.classList.add("descending");
  } else if (evt.target.classList.contains("descending")) {
    evt.target.classList.add("ascending");
    evt.target.classList.remove("descending");
  } else {
    evt.target.classList.add("ascending");
  }
  sortOn(evt.target);
});

function sortOn(element){
   if(element.id ==='movie-header') {
    sortRows(0,element);
  } else if (element.id === 'rating-header') {
    sortRows(1,element);
  }
}

function sortRows(child,element) {
  let movieList = [];
  if(element.classList.contains("ascending")) {
    $('.movie-table-body').children().each(function () {
      for (i = 0; i< movieList.length; i++) {
        if ($(this).children()[child].innerText < movieList[i].children()[child].innerText) {
          movieList.splice(i,0,$(this));
          return;
        }
      }
      movieList.push($(this));        
    });
  } else if(element.classList.contains("descending")) {
    $('.movie-table-body').children().each(function () {
      for (i = 0; i< movieList.length; i++) {
        if ($(this).children()[child].innerText > movieList[i].children()[child].innerText) {
          movieList.splice(i,0,$(this));
          return;
        }
      }
      movieList.push($(this));        
    });
  }

  $('.movie-table-body').children().remove();
  movieList.forEach((val) => {
    $('.movie-table-body').append(val);
  })
  
}


