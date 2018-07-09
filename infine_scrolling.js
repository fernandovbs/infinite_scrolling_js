const wrapper = document.getElementById('wrapper');
const table = document.getElementById('content');
var data = [];
var tableSize, lastPosition, nextPosition, position, rowHeight = 0;

scrollHandler = function() {
    position = wrapper.scrollTop + wrapper.offsetHeight + 200;    
    if (position > nextPosition){
        rows = $('#content-table > tbody').html();
        console.log(rows);
        lastPosition = position;
        nextPosition += tableSize;
    }

    if (position < lastPosition) {
        console.log('load above...')
        lastPosition = lastPosition - tableSize > 0 ? position - tableSize : 0;
        nextPosition = nextPosition - tableSize > 0 ? nextPosition - tableSize : tableSize;
    }
}

addEvent = function(event, func, obj) {
    if (obj.addEventListener)
        obj.addEventListener(event, func, false)
    else if (obj.attachEvent)
        obj.attachEvent(event, func)
}

initializeTable = function(data, totalSize){
    var rows = [];
    $.each(data, function(key, item){
        rows.push('<tr><td>'+item._id+'</td><td>'+item.company+'</td></tr>');
    });
    rows.push('<tr id="last-row" style="height:'+totalSize+'px;"><td></td><td></td></tr>');
    var tableContent = rows.join( "" );
    $('#content-table').html(
        '<tbody>'+tableContent+'</tbody>'
    );    
}

$.getJSON('dados.json').done(function(payload){
    data = payload;
    rowHeight = table.offsetHeight;
    dataInterval = data.slice(0, 200);
    totalSize = rowHeight * (data.length - 200);

    initializeTable(dataInterval, totalSize);

    tableSize = rowHeight * 200;
    lastPosition = 0;
    nextPosition = tableSize;

    addEvent('scroll', scrollHandler, wrapper);
});