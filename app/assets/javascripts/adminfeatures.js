var showAdminView = function(){
  var request = $.ajax({
    url: '/orders',
    format: 'html',
    type: 'GET'
  });

  request.done(function(data){
    $('#openModal').html(data)
    $('#openModal').append(closer);
    fadeBackground()
  });
}

var showAdminBar = function(){
  $('#adminViewButton').parent().show();
}

$(function(){
  $('#openModal').on('click', '.delete', function() {

    var id = $(this).attr('id')

    var request = $.ajax({
      type: 'delete',
      url: "/orders/" + id
    });
    fadeThis = $("#" + id).parent().parent();
    request.done(function(response){
      if(response.success == true){
        fadeThis.fadeOut(500);
      } else {
        alert("Sumin went wrong\n surprise attack killed him in his sleep at night")
      }
    });
  });
  $('#openModal').on('click', '.filled', function() {
    var body = {
      order: {
        id: $(this).attr('id')
      }
    }

    var request = $.ajax({
      type: 'GET',
      url: '/orders/fill',
      data: body
    });
    $(this).addClass('success')
    $(this).text('Yay!')
  });
});
