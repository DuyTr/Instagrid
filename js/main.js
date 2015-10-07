$(function() {
  $('#album-search').submit(function(event)  {
    event.preventDefault();
    $('.album-list').empty();
    var input = $('#artist-name').val();
     $.ajax({
        method: 'GET',
        url: 'https://itunes.apple.com/search?entity=album&limit=6&term='+input,
        dataType: "jsonp"

     })
  });
});
