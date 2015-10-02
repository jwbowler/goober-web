$(document).ready(function () {
    $('#demo-button').on('click', function() {
        $('#slides-button').removeClass('active');
        $('#demo-button').addClass('active');

        $('#slides').addClass('hidden');
        $('#demo').removeClass('hidden');
    });

    $('#slides-button').on('click', function() {
        $('#demo-button').removeClass('active');
        $('#slides-button').addClass('active');

        $('#demo').addClass('hidden');
        $('#slides').removeClass('hidden');
    });

    var table = $('tbody');
    for (var i = 0; i < 100; i++) {
        table.append('<tr>');
    }

    var counter = 0;
    table.children('tr').each(function(j) {
        var tr = $(this);
        for (var i = 0; i < 100; i++) {
            tr.append('<td class=' + counter + '>');
            counter += 1;
        }
    });

    $('td').click(function () {
        var cell = this.className;

        var content = 'Zone: ' + cell;

        // $.getJSON(
        $('#detail').text(content)
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
    // console.log(e.data);

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

    var col = Math.floor(cell/100) + 1;
    var row = (cell % 100) + 1;

    var cell = $('tbody tr:nth-child(' + col + ') td:nth-child(' + row + ')');

    // cell.text(avg + '/' + p90);
    cell.css('background-color', 'white')

    $('#timebox').text('Time: ' + lastTimeFormatted)
};

sockjs.onclose = function() {
    console.log('Closing connection.');
};
