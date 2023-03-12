$(function() {
  console.log("Let's get ready to party with jQuery!")
});

$('img').addClass("image-center");

$('p:last-of-type').remove();
$('#title').css('font-size', Math.random()*100);
$('<li>Whatever I want!</li>').appendTo('ol');
$('ol').remove()
$("<p>Sorry for the list's existence</p>").appendTo("aside.col-sm-4")

$('input.form-control').on("change", function() {
  $('body').css("background-color", `rgb(${$('input.form-control').eq(0).val()},${$('input.form-control').eq(1).val()},${$('input.form-control').eq(2).val()})`);
});

$('img').on('click', function(){
  $(this).remove();
});