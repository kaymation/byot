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
  parts: [
    {
      asset: 'assets/angry_base.x3d',
      height: 3.08445
    }
  ],
  totalHeight: function(){
    if (this.parts.length == 1){
      return this.parts[0].height
    } else {
      var heights = this.parts.map(function(part){
        return part.height;
      });
      result = heights.reduce(function(a, b){
        return a + b;
      });
      console.log(result);
      return result;
    }
  }
};

$(function(){
  $(document).foundation();

  $('#tikis').change(function(event){
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


  $('scene').on('load', 'inline', function(event){
    console.log("nonsenz");
    document.getElementById('tikiView').runtime.showAll();
  });

});

$(document).on('downloadsfinished', function(event){
  document.getElementById('tikiView').runtime.showAll();
});


var elementForTiki = function(asset) {
  var openTag = '<transform id="tiki-'+ (pole.parts.length + 1) + '" translation="0 ' + pole.totalHeight() + ' 0"> '
  var inline = '<inline url="'+ asset +'"></inline>';
  var closer = '</transform>'
  return openTag + inline + closer;
}
