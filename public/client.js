$(document).ready(function () {
    var tableContainer = $('#table-container')
    for (var i = 0; i < 50; i++) {
        tableContainer.append('<tr>');
    }
    tableContainer.children('tr').each(function(j) {
        var td = $(this)
        for (var i = 0; i < 50; i++) {
            td.append('<td>');
        }
    });
});

var sockjs_url = '/stream';

var sockjs = new SockJS(sockjs_url);
var userid = 'guest' + new Date().getSeconds();

var lastTime = 0;
var lastTimeFormatted = 'blah'

sockjs.onopen = function() {
    console.log('Connected.');
};

sockjs.onmessage = function(e) {
    console.log(e.data);

    var tokens = e.data.split('/');
    var cell = tokens[0];
    var avg = tokens[1];
    var p90 = tokens[2];
    var timestamp = parseInt(tokens[3]);

    if (timestamp > lastTime) {
        lastTime = timestamp

        var date = new Date(lastTime)

        // hours part from the timestamp
        var hours = date.getHours();
        // minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        var lastTimeFormatted = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }

    var col = Math.floor(cell/10) + 1;
    var row = (cell % 10) + 1;

    var cell = $('table tr:nth-child(' + col + ') td:nth-child(' + row + ')');

    // cell.text(avg + '/' + p90);
    cell.css('background-color', 'white')

    $('#timebox').text(lastTimeFormatted)
};

sockjs.onclose = function() {
    console.log('Closing connection.');
};
