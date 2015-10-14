$(function() {
var input = '';
  $('#search-form').submit(function(event)  {
    event.preventDefault();
    $('.content-img').remove();
    $('.image-list').empty();

    input = $('#hashname').val();
    // var new_url ='';
     $.ajax({
        method: 'GET',
        url: 'https://api.instagram.com/v1/tags/'+input+'/media/recent?count=12&client_id=75418656075f4ec7924f19d986189d18',
        dataType: "jsonp",
        // jsonpCallback: ''

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
           imageItem += '<li>';
           imageItem += '<img class="img_photo" src="'+img_link+'">';
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
    }); //1st done
}); //finish #searchform submit


$('.content').on('click', '#load-btn', function(event) {
  event.preventDefault();
  console.log(input);

   $.ajax({
      method: 'GET',
      url: input,
      dataType: "jsonp"
      // jsonp:false,
      // jsonpCallback: ''
   })
  .done(function(next_results){
    var next_imageItem='';
    var next_result = next_results.data;
    next_url = next_results.pagination.next_url;
    index1 = next_url.indexOf('callback');
    index2 = next_url.indexOf('client_id');
    sub_url1 = next_url.substr(0,index1);
    sub_url2 = next_url.substr(index2,next_url.length);
    input = sub_url1 + sub_url2;
    console.log(input);

     $.each(next_result, function( key, value ){
       var next_cmt_count = value.comments.count;
       var next_like_count = value.likes.count;
       var next_img_link = value.images.standard_resolution.url;
       var next_username = value.user.username;
       var next_user_link = value.user.profile_picture;
       next_imageItem += '<li>';
       next_imageItem += '<img src="'+next_img_link+'">';
       next_imageItem += '<div class="img_footer">';
       next_imageItem += '<img src="'+next_user_link+'">';
       next_imageItem += '<div class="img_info">';
       next_imageItem += '<span class="img_info1">';
       next_imageItem += next_username;
       next_imageItem += '</span>';
       next_imageItem += '<span class="img_info2">'
       next_imageItem += '<i class="fa fa-comment"></i>'+next_cmt_count+'<i class="fa fa-heart"></i>'+next_like_count;
       next_imageItem += '</span>';
       next_imageItem += '</div>';
       next_imageItem += '</div>';
       next_imageItem += '</li>';
    });
  $('.image-list').append(next_imageItem);
  }); //2nd done
}); //finish load-btn clicked


});
