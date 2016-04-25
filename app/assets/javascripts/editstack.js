var stackElement = function(thumbnail, index, base) {
  var openTag = "<div class='tikiStackElement' id='" + index + "'>";
  var thumb = "<img src='"+thumbnail.attr('src')+"'>";

  var editButton = "<img class='edit' src='/assets/editIcon.png'>";
  if(base){
    var deleteButton = "";
  }else{

    var deleteButton = "<img class='delete' src='/assets/deleteIcon.png'>";
  }
  var close = '</div>';
  return "<li>" + openTag + thumb + editButton + deleteButton + close + "</li>";

}

var reloadTikiPole = function(parts){
  $('transform').remove();
  var runningHeight = 0;
  pole.parts.forEach(function(part, index){
    var newHead = elementForRebuildTiki(part.asset, index+1, runningHeight);
    runningHeight += parseFloat(part.height)
    $('scene').prepend(newHead);
  });
}

var elementForRebuildTiki = function(asset, index, height) {
    var openTag = '<transform id="tiki-' + index + '" translation="0 ' + height + ' 0"> '
    var inline = '<inline url="' + asset + '"></inline>';
    var closer = '</transform>'
    return openTag + inline + closer;
};

$(function(){

$('#editStack').on('click', '.delete', function() {
  if (confirm('Removed this totem from the stack?')) {
    id = $(this).parent().prop('id') - 1;
    pole.parts.splice(id, 1);
    reloadTikiPole();
    $(this).parent().parent().remove();
    var items = $('#stackList').find('li').find('.tikiStackElement');
    $.each(items, function(index, item){
      console.log(typeof(item));
      item.id = items.length - (index);
    })
  }
});

$('#editStack').on('click', '.edit', function() {

});

});
