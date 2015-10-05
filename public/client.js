$(document).ready(function () {
    $('#slides-button').on('click', function() {
        $('#slides-button').addClass('active');
        $('#demo-button').removeClass('active');
        $('#debug-button').removeClass('active');

        $('#slides').removeClass('hidden');
        $('#demo').addClass('hidden');
        $('#debug').addClass('hidden');
    });

    $('#demo-button').on('click', function() {
        $('#slides-button').removeClass('active');
        $('#demo-button').addClass('active');
        $('#debug-button').removeClass('active');

        $('#slides').addClass('hidden');
        $('#demo').removeClass('hidden');
        $('#debug').addClass('hidden');
    });

    $('#debug-button').on('click', function() {
        $('#slides-button').removeClass('active');
        $('#demo-button').removeClass('active');
        $('#debug-button').addClass('active');

        $('#slides').addClass('hidden');
        $('#demo').addClass('hidden');
        $('#debug').removeClass('hidden');
    });

    var table = $('#demo-left tbody');
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

    var table = $('#demo-right tbody');
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

    $('td').click(function() {
        var cell = this.className;

        var content = 'Zone: ' + cell;

        // $.getJSON(
        $('#detail').text(content)
    });

    var canvas1 = document.getElementById('canvas1');
    var ctxt1 = canvas1.getContext('2d');
    ctxt1.fillStyle = 'rgb(0, 0, 0)';
    ctxt1.fillRect(0, 0, 500, 500);

    var canvas2 = document.getElementById('canvas2');
    var ctxt2 = canvas2.getContext('2d');
    ctxt2.fillStyle = 'rgb(0, 0, 0)';
    ctxt2.fillRect(0, 0, 500, 500);

    setInterval(function() {
        ctxt1.fillStyle = 'rgb(0, 0, 0)';
        ctxt1.fillRect(0, 0, 500, 500);

        ctxt2.fillStyle = 'rgb(0, 0, 0)';
        ctxt2.fillRect(0, 0, 500, 500);

        $.getJSON('/current', function(data) {
            console.log('current');
            console.log(data);
            $.each(data, function(k, v) {
                var cellIdx = k;
                var vals = v.split(',');
                var count = vals[0];
                var avg = vals[1];
                var p90 = vals[2];

                var col = Math.floor(cellIdx/100);
                var row = (cellIdx % 100);

                var rightColor = Math.max(0, Math.min(255, avg));

                ctxt1.fillStyle = 'rgb(' + rightColor + ', ' + rightColor + ', ' + rightColor + ')';
                ctxt1.fillRect(row*5, col*5, 5, 5);
            });
        });

        $.getJSON('/compare', function(data) {
            console.log('compare');
            console.log(data);
            $.each(data, function(k, v) {
                var cellIdx = k;
                var avg = v.split(',')[1];

                var col = Math.floor(cellIdx/100);
                var row = (cellIdx % 100);

                var leftColor = Math.max(0, Math.min(255, avg));

                ctxt2.fillStyle = 'rgb(' + leftColor + ', ' + leftColor + ', ' + leftColor + ')';
                ctxt2.fillRect(row*5, col*5, 5, 5);
            });
        });
    }, 2000);
});

// var sockjs_url = '/stream';

// var sockjs = new SockJS(sockjs_url);
// var userid = 'guest' + new Date().getSeconds();

var lastTime = 0;
var lastTimeFormatted = 'blah'

// sockjs.onopen = function() {
    // console.log('Connected.');
// };

// sockjs.onmessage = function(e) {
    // // console.log(e.data);

    // var tokens = e.data.split('/');
    // var cell = tokens[0];
    // var avg = tokens[1];
    // var p90 = tokens[2];
    // var timestamp = parseInt(tokens[3]);
    // var batchAvg = tokens[4];

    // if (timestamp > lastTime) {
        // lastTime = timestamp

        // var date = new Date(lastTime)

        // // hours part from the timestamp
        // var hours = date.getHours();
        // // minutes part from the timestamp
        // var minutes = "0" + date.getMinutes();
        // // seconds part from the timestamp
        // var seconds = "0" + date.getSeconds();

        // var lastTimeFormatted = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    // }

    // var col = Math.floor(cell/100) + 1;
    // var row = (cell % 100) + 1;


    // var cell = $('#demo-left tbody tr:nth-child(' + col + ') td:nth-child(' + row + ')');
    // var otherCell = $('#demo-right tbody tr:nth-child(' + col + ') td:nth-child(' + row + ')');

    // // cell.text(avg + '/' + p90);
    // var leftColor = Math.max(0, Math.min(255, avg));
    // // var rightColor = Math.max(0, Math.min(255, batchAvg));

    // // console.log(cell + ' ' + leftColor);

    // cell.css('background-color', 'rgb(' + leftColor + ', ' + leftColor + ', ' + leftColor + ')');
    // // cell.css('background-color', 'rgb(255, 255, 255)');

    // // otherCell.css('background-color', 'rgb(' + rightColor + ', ' + rightColor + ', ' + rightColor + ')');

    // // $('#timebox').text('Time: ' + lastTimeFormatted)
// };

// sockjs.onclose = function() {
    // console.log('Closing connection.');
// };
