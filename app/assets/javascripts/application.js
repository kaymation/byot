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

initialPole = {
    parts: [],
    totalHeight: function() {
        if (this.parts.length == 0) {
            return 0.0;
        } else if (this.parts.length == 1) {
            return this.parts[0].height;
        } else {
            var heights = this.parts.map(function(part) {
                return parseFloat(part.height);
            });
            result = heights.reduce(function(a, b) {
                return a + b;
            });
            return result;
        }
    }
};

pole = initialPole;

var closer = "<br/><button id='modalClose' class='button blue float-center'>Done!</button>"

var grayness = " <div id='grayness' class='modal-overlay js-modal-close'></div>"

var lastGuidance = "<strong class='text-center'>Great! Now click the 'Add Totem' button to build your pole!</strong> \
                  <br/><button id='modalClose' class='button blue float-center'>I got it!</button>"

var fadeBackground = function() {
    $('body').append(grayness);
    $('#grayness').css('opacity', 100, 'slow');
    $('#openModal').fadeIn(600);
}

var removeModal = function() {
    // $('#grayness').css('opacity', 0);
    $('#grayness').remove();
    $('#openModal').fadeOut(500);
}


$(function() {
    $(document).foundation();


    $('#tikis').change(function(event) {
        var obj = $('#tikis :selected').val()

        var nextBlock = elementForTiki(obj);

        $('scene').prepend(nextBlock);

        // console.log($('#tikis :selected').attr('data-height'));
        var obj_height = parseFloat($('#tikis :selected').attr('data-height'));
        pole.parts.push({
            asset: obj,
            height: obj_height
        });
        // while($('#tiki-' + pole.parts.length).find('inline').prop('load') != "true"){
        //
        // }
        document.getElementById('tikiView').runtime.showAll();
    })


    $(window).resize(function() {
        $(".modal-box").css({
            top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
            left: ($(window).width() - $(".modal-box").outerWidth()) / 2.5
        });
    });

    $('#openModal').on('click', '#signUpFromLogin', function(e) {
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

    $('#openModal').on('click', '#signInFromRegister', function(e) {
        getSignIn();
    });

    $('#openModal').on('submit', 'form#new_user', function(event) {
        event.preventDefault();
        var body = {
            email: $("#user_email").val(),
            password: $("#user_password").val(),
            password_confirmation: $("#user_password_confirmation").val()
        };

        var request = $.ajax({
            type: 'POST',
            url: '/users',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
            },
            data: {
                user: body
            }
        });

        request.done(function(data) {
            if (data.success != true) {
                data.errors.forEach(function(error) {
                    $('#openModal').prepend(error)
                });
            } else {
                var emailLink = $('#appendEmailHere').find('a');
                emailLink.text(navLine(data.email, data.tikicount));

                removeModal();
                signedInNav();
                showBases();
            }
        });
    });

    $('#openModal').on('submit', 'form#sign_in_user', function(event) {
        event.preventDefault();
        var body = {
            email: $("#user_email").val(),
            password: $("#user_password").val(),
        };

        var request = $.ajax({
            type: 'POST',
            url: '/users/sign_in',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
            },
            data: {
                user: body
            }
        });

        request.done(function(data) {
            if (data.success != true) {
                data.errors.forEach(function(error) {
                    $('#openModal').prepend(error)
                });
            } else {
                var emailLink = $('#appendEmailHere').find('a');
                emailLink.text(navLine(data.email, data.count));
                signedInNav();
                showBases();
                if(data.admin == true){
                  showAdminBar();
                }
            }
        });
    });

    $('#signOutButton').click(function() {
        if (confirm('Are you sure you want to sign out?\nAny progress will be lost')) {
            var request = $.ajax({
                type: 'get',
                url: '/users/sign_out'
            });

            request.done(function() {
                getSignIn();
                signedOutNav();
                $('#adminViewButton').parent().hide();
            });
            pole = initialPole;
            $('scene').html("");
            $('#stackList').html("");
            $('#buyButton').hide();
        }
    });

    $('#openModal').on('click', '#modalClose', function(e) {
        removeModal();
    });


    $('#openModal').on('click', '.base_option', function() {
        var obj = $(this).find('img').attr('data-obj');
        var height = $(this).find('img').attr('data-height');
        var to_prepend = elementForTiki(obj);
        pole.parts.push({
            asset: obj,
            height: height
        });
        $('scene').prepend(to_prepend);
        $('#stackList').prepend(stackElement($(this).find('img'), pole.parts.length, true))
        $('#newHead').show();
        $('#openModal').slideUp(function() {
            $('#openModal').html(lastGuidance);
        });
        $('#openModal').slideDown();
    });
    $('#openModal').on('click', '.head_option', function() {
        var obj = $(this).find('img').attr('data-obj');
        var height = $(this).find('img').attr('data-height');
        var to_prepend = elementForTiki(obj);
        pole.parts.push({
            asset: obj,
            height: height
        });
        $('scene').prepend(to_prepend);
        $('#stackList').prepend(stackElement($(this).find('img'), pole.parts.length, false))
        if (pole.parts.length > 2) {
          $('#buyButton').fadeIn(400);
        }
        removeModal();
        $('.modal-overlay').remove();

    });

    $('#editStack').on('click', '#newHead', function() {
      showHeads();
    });

    $('#buyButton').click(function(){
      var request = $.ajax({
        type: 'get',
        url: '/orders/new',
        format: 'html'
      });

      request.done(function(response){
        $('#openModal').html(response);
        fadeBackground();
      });
    });

    $('#openModal').on('click', '#orderNowButton', function(e){
      e.preventDefault();
      var poleToPost = pole.parts.map(function(part){
        return part.asset;
      });

      var orderInfo = {
        street: $("#street_address").val(),
        zip: $('#zip').val()
      };

      var requestBody = {
        pole: poleToPost,
        address: orderInfo
      }

      var request = $.ajax({
        url: '/orders',
        method: 'POST',
        data: requestBody,
        success: function(data){
          removeModal();
          alert("Order successfully placed!\nWatch ya mailbox!");
          var emailLink = $('#appendEmailHere').find('a');

          emailLink.text(navLine(data.email, data.count));

        },
        error: function(){
          if( !$('#openModal').text().match(/Sorry, your order/)){
            $('#openModal').prepend("<strong>Sorry, your order cannot be processed</strong>");
          }
        }
      });


    });
    $('#adminViewButton').click(showAdminView);

    $(window).resize();

});

$(document).on('downloadsfinished', function(event) {
    document.getElementById('tikiView').runtime.showAll();
});

$(document).ajaxError(function(e, xhr) {
    if (xhr.status == 401) {
        if (!$('#openModal').text().match("Invalid email")) {
            $('#openModal').prepend("<span>Invalid email or password</span>");
        }
    }
});

var signedInNav = function() {
    $('#signedInButtons').show('slow');
    $('#unauthButtons').hide('medium');
}

var signedOutNav = function() {
    $('#signedInButtons').hide('slow');
    $('#unauthButtons').show('medium');
}


var elementForTiki = function(asset, index, height) {
    var openTag = '<transform id="tiki-' + (pole.parts.length + 1) + '" translation="0 ' + pole.totalHeight() + ' 0"> '
    var inline = '<inline url="' + asset + '"></inline>';
    var closer = '</transform>'
    return openTag + inline + closer;
};

var showBases = function() {
    var request = $.ajax({
        url: '/tikis/bases',
        type: 'GET',
        format: 'html'
    });
    request.done(function(result) {
        $('#openModal').slideUp(function() {

            $('#openModal').html(result);
        });
        // fadeBackground();
        $('#openModal').slideDown();
    })
}

var showHeads = function() {
  var request = $.ajax({
      url: '/tikis/heads',
      type: 'GET',
      format: 'html'
  });
  request.done(function(result) {
      $('#openModal').slideUp(function() {

          $('#openModal').html(result);
          $('#openModal').append("<br/><button id='modalClose' class='button blue float-center'>Nevermind</button>");
      });
      // fadeBackground();
      $('#openModal').slideDown();
  });
}

var getSignIn = function() {
    $('body').append(grayness);
    $('#grayness').css('opacity', 100, 'slow');
    var request = $.ajax({
        method: 'GET',
        url: '/users/sign_in',
        format: 'html'
    });

    request.done(function(data) {
        $('#openModal').slideUp('fast', function() {
            $('#openModal').html(data);

        });
        $('#openModal').slideDown();
    });
}

var getSignUp = function() {
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
}
var navLine = function(email, number){
  return email + ", you have " + number + " totempoles"
}
