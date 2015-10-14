$(function() {
var input = '';
var moreImg = false;
$('.loader').toggle(false);
  $('#search-form').submit(function(event)  {
    event.preventDefault();
    $('.content-img').remove();
    $('.loader').toggle(true);
    $('.image-list').empty();

    input = $('#hashname').val();
     $.ajax({
        method: 'GET',
        url: 'https://api.instagram.com/v1/tags/'+input+'/media/recent?count=12&client_id=75418656075f4ec7924f19d986189d18',
        dataType: "jsonp",
        // jsonpCallback: ''

     })
     .done(function(results){
       $('.content-grid').css('display','block');
         var imageItem='';
         var result = results.data;
         var next_url = results.pagination.next_url;
         if (next_url) {
         var index1 = next_url.indexOf('callback');
         var index2 = next_url.indexOf('client_id');
         var sub_url1 = next_url.substr(0,index1);
         var sub_url2 = next_url.substr(index2,next_url.length);
         input = sub_url1 + sub_url2;
         moreImg = true;
          }

         $.each(result, function( key, value ){
           var cmt_count = value.comments.count;
           var like_count = value.likes.count;
           var img_link = value.images.standard_resolution.url;
           var username = value.user.username;
           var user_link = value.user.profile_picture;
           imageItem += '<li class="abcd">';
           imageItem += '<div>';
           imageItem += '<a href="'+img_link+'"class="fancybox" rel="gallery"><img class="img_photo" src="'+img_link+'"></a>';
           imageItem += '</div>';
           imageItem += '<div class="img_footer">'
           imageItem += '<img src="'+user_link+'">';
           imageItem += '<div class="img_info">';
           imageItem += '<span class="img_info1">';
           imageItem += username;
           imageItem += '</span>';
           imageItem += '<span class="img_info2">'
           imageItem += '<i class="fa fa-comment"></i>'+cmt_count+' '+'<i class="fa fa-heart"></i>'+like_count;
           imageItem += '</span>';
           imageItem += '</div>';
           imageItem += '</div>';
           imageItem += '</li>';
        });
      $('.image-list').append(imageItem);
      $('.loader').toggle(false);
    }); //1st done
}); //finish #searchform submit


$('.content').on('click', '#load-btn', function(event) {
  event.preventDefault();
  if (moreImg){
  $('.loader').toggle(true);
   $.ajax({
      method: 'GET',
      url: input,
      dataType: "jsonp"
   })
  .done(function(results){
    var imageItem='';
    var result = results.data;
    var next_url = results.pagination.next_url;
    var index1 = next_url.indexOf('callback');
    var index2 = next_url.indexOf('client_id');
    var sub_url1 = next_url.substr(0,index1);
    var sub_url2 = next_url.substr(index2,next_url.length);
    input = sub_url1 + sub_url2;


    $.each(result, function( key, value ){
      var cmt_count = value.comments.count;
      var like_count = value.likes.count;
      var img_link = value.images.standard_resolution.url;
      var username = value.user.username;
      var user_link = value.user.profile_picture;
      imageItem += '<li class="abcd">';
      imageItem += '<div>';
      imageItem += '<a href="'+img_link+'"class="fancybox" rel="gallery"><img class="img_photo" src="'+img_link+'"></a>';
      imageItem += '</div>';
      imageItem += '<div class="img_footer">'
      imageItem += '<img src="'+user_link+'">';
      imageItem += '<div class="img_info">';
      imageItem += '<span class="img_info1">';
      imageItem += username;
      imageItem += '</span>';
      imageItem += '<span class="img_info2">'
      imageItem += '<i class="fa fa-comment"></i>'+cmt_count+' '+'<i class="fa fa-heart"></i>'+like_count;
      imageItem += '</span>';
      imageItem += '</div>';
      imageItem += '</li>';
      });
    $('.image-list').append(imageItem);
    $('.loader').toggle(false);
  }); //2ns done
  }
  else {alert('No More Image With This Tag');}
  }); //finish #loadmore
   $('.fancybox').fancybox();
});
