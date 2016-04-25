
var viewMultipliers = {
  left: {
    pos: {
      x: function () {
        return 1.5 * pole.totalHeight();
      },
      y: function(){
        return pole.totalHeight()/2.0;
      },
      z: function(){
        return 0;
      }
    },
    angle: "0 1 0 1.6"
  },
  right: {
    pos: {
      x: function(){
        return -1.5 * pole.totalHeight();
      },
      y: function(){
        return pole.totalHeight()/2.0;
      },
      z: function(){
        return 0;
      }
    },
    angle: "0 -1 0 1.6"
  },
  front: {
    pos: {
      x: function() {
        return 0;
      },
      y: function(){
        return pole.totalHeight()/2.0;
      },
      z: function(){
        return 1.5 * pole.totalHeight();
      }
    },
    angle: "0 0 0 0"
  },
  back: {
    pos: {
      x: function(){
        return 0;
      },
      y: function(){
        return pole.totalHeight()/2.0;
      },
      z: function() {
        return -1.5 * pole.totalHeight();
      }
    },
    angle: "0 1 0 3.15"
  }
}

// <Viewpoint position="0.0 1.6 5.7" orientation="0.00000 0.00000 0.00000 0.00000"
// 	zNear="2.33862" zFar="10.12565" description="camera"></Viewpoint>

$(function(){
  $('a#left').click(function(){
    console.log("left clicked");
    constructPort('left');
  });
  $('a#right').click(function(){
    constructPort('right');
  });
  $('a#front').click(function(){
    constructPort('front');
  });
  $('a#back').click(function(){
    constructPort('back');
  });

});

var constructPort = function(direction, height){
  var postion = viewMultipliers[direction].pos.x() + " "
    + viewMultipliers[direction].pos.y() + " " + viewMultipliers[direction].pos.z();
  var camera = $('viewpoint#' + direction);
  camera.attr('position', postion);
  camera.attr('orientation', viewMultipliers[direction].angle);
  camera.attr('set_bind', 'true');
}
