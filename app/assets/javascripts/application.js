// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require turbolinks
//= require_tree .

pole = {
    parts: [{
        asset: 'assets/angry_base.x3d',
        height: 3.08445
    }],
    totalHeight: function() {
        if (this.parts.length == 1) {
            return this.parts[0].height
        } else {
            var heights = this.parts.map(function(part) {
                return part.height;
            });
            result = heights.reduce(function(a, b) {
                return a + b;
            });
            console.log(result);
            return result;
        }
    }
};

var grayness = " <div id='grayness' class='modal-overlay js-modal-close'></div>"


var fadeBackground = function() {
    $('body').append(grayness);
    $('#grayness').css('opacity', 100);
    $('#openModal').fadeIn(600);
}

var removeModal = function() {
  $('#grayness').css('opacity', 0);
  $('#grayness').remove();
  $('#openModal').fadeOut(500);
}


$(function() {
    $(document).foundation();


    $('#tikis').change(function(event) {
        var obj = $('#tikis :selected').val()

        var nextBlock = elementForTiki(obj);

        $('scene').prepend(nextBlock)

        // console.log($('#tikis :selected').attr('data-height'));
        var obj_height = parseFloat($('#tikis :selected').attr('data-height'));
        console.log(obj_height);
        pole.parts.push({
            asset: obj,
            height: obj_height
        });
        // while($('#tiki-' + pole.parts.length).find('inline').prop('load') != "true"){
        //
        // }
        document.getElementById('tikiView').runtime.showAll();
    })


    $('scene').on('load', 'inline', function(event) {
        console.log("nonsenz");
        document.getElementById('tikiView').runtime.showAll();
    });

    $(window).resize(function() {
        $(".modal-box").css({
            top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
            left: ($(window).width() - $(".modal-box").outerWidth()) / 2.5
        });
    });

    $('#signUpFromLogin').click(function(e) {
        e.preventDefault();

        var request = $.ajax({
            method: 'GET',
            url: '/users/sign_up',
            format: 'html'
        });

        request.done(function(data) {
            $('#openModal').slideUp('fast', function() {
                $('#openModal').html(data);

            });
            $('#openModal').slideDown();
        });
    });

    $('#openModal').on('submit', 'form#new_user', function(event) {
        event.preventDefault();
        console.log("submit clicked");
        var body = {
            email: $("#user_email").val(),
            password: $("#user_password").val(),
            password_confirmation: $("#user_password_confirmation").val()
        };

        var request = $.ajax({
          type: 'POST',
          url: '/users',
          beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
          data: {
            user: body
          }
        });

        request.done(function(data) {
          if(data.success != true){
            data.errors.forEach(function(error) {
              $('#openModal').prepend(error)
            });
          }else {
            var emailLink = $('#appendEmailHere').find('a');
            if(!emailLink.text().match(data.email)){
              emailLink.prepend(data.email);

            }
            removeModal();
            signedInNav();
          }
        });
    });

    $('#openModal').on('submit', 'form#sign_in_user', function(event) {
        event.preventDefault();
        console.log("submit clicked");
        var body = {
            email: $("#user_email").val(),
            password: $("#user_password").val(),
        };

        var request = $.ajax({
          type: 'POST',
          url: '/users/sign_in',
          beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
          data: {
            user: body
          }
        });

        request.done(function(data) {
          if(data.success != true){
            data.errors.forEach(function(error) {
              $('#openModal').prepend(error)
            });
          }else {
            var emailLink = $('#appendEmailHere').find('a');
            if(!emailLink.text().match(data.email)){
              emailLink.prepend(data.email);

            }
            removeModal();
            signedInNav();
          }
        });
    });

    $('#signOutButton').click(function(){
      if (confirm('Are you sure you want to sign out?\nAny progress will be lost')){
        var request = $.ajax({
          type: 'delete',
          url: '/users/sign_out'
        });

        request.done(function(){
          fadeBackground();
          signedOutNav();
        });
      }
    });

    $(window).resize();

});

$(document).on('downloadsfinished', function(event) {
    document.getElementById('tikiView').runtime.showAll();
});

$(document).ajaxError(function(e, xhr) {
    if (xhr.status == 401) {
      if(!$('#openModal').text().match("Invalid email")){
        $('#openModal').prepend("<span>Invalid email or password</span>");
      }
    }
});

var signedInNav = function(){
  $('#signedInButtons').show('slow');
  $('#unauthButtons').hide('medium');
}

var signedOutNav = function(){
  $('#signedInButtons').hide('slow');
  $('#unauthButtons').show('medium');
}


var elementForTiki = function(asset) {
    var openTag = '<transform id="tiki-' + (pole.parts.length + 1) + '" translation="0 ' + pole.totalHeight() + ' 0"> '
    var inline = '<inline url="' + asset + '"></inline>';
    var closer = '</transform>'
    return openTag + inline + closer;
};
