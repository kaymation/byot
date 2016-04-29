var stackElement = function(thumbnail, index, base) {
    var openTag = "<div class='tikiStackElement' id='" + index + "'>";
    var thumb = "<img src='" + thumbnail.attr('src') + "'>";

    var editButton = "<img class='edit' src='/assets/editIcon.png'>";
    if (base) {
        var deleteButton = "";
    } else {

        var deleteButton = "<img class='delete' src='/assets/deleteIcon.png'>";
    }
    var close = '</div>';
    return "<li>" + openTag + thumb + editButton + deleteButton + close + "</li>";

}

var reloadTikiPole = function(parts) {
    $('transform').remove();
    var runningHeight = 0;
    pole.parts.forEach(function(part, index) {
        var newHead = elementForRebuildTiki(part.asset, index + 1, runningHeight);
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

var swapHead = function(index) {
    if (index > 0) {
        showReplacementHeads(index);
    }
};

var showReplacementHeads = function(index) {
    var request = $.ajax({
        url: '/tikis/edithead',
        type: 'GET',
        format: 'html',
        data: {
            index: index
        }
    });

    request.done(function(result) {
        $('#openModal').slideUp(function() {

            $('#openModal').html(result);
            $('#openModal').append("<br/><button id='modalClose' class='button blue float-center'>Nevermind</button>");
        });
        // fadeBackground();
        $('#openModal').slideDown();
    });
};

$(function() {

    $('#editStack').on('click', '.delete', function() {
        if (confirm('Removed this totem from the stack?')) {
            var id = $(this).parent().prop('id') - 1;
            pole.parts.splice(id, 1);
            reloadTikiPole();
            $(this).parent().parent().remove();
            var items = $('#stackList').find('li').find('.tikiStackElement');
            $.each(items, function(index, item) {
                console.log(typeof(item));
                item.id = items.length - (index);
            })
        }
    });

    $('#editStack').on('click', '.edit', function() {
        var id = $(this).parent().prop('id') - 1;
        swapHead(id)
    });

    $('#openModal').on('click', '.head_swap_option', function() {
        var index = $(this).parent().prop('id');
        var obj = $(this).find('img').attr('data-obj');
        var height = $(this).find('img').attr('data-height');
        pole.parts[index] = {
            asset: obj,
            height: height
        }
        removeModal();
        var thumb = $(this).find('img').attr('src')
        debugger;
        $('#stackList').find('#' + (parseInt(index) + 1)).find('img')[0].src = thumb
        reloadTikiPole();
    });

});
