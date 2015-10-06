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

    var canvas0 = document.getElementById('main-canvas');
    var ctxt0 = canvas0.getContext('2d');
    ctxt0.fillStyle = 'rgb(0, 0, 0)';
    ctxt0.fillRect(0, 0, 1000, 1000);

    var canvas1 = document.getElementById('canvas1');
    var ctxt1 = canvas1.getContext('2d');
    ctxt1.fillStyle = 'rgb(0, 0, 0)';
    ctxt1.fillRect(0, 0, 500, 500);

    var canvas2 = document.getElementById('canvas2');
    var ctxt2 = canvas2.getContext('2d');
    ctxt2.fillStyle = 'rgb(0, 0, 0)';
    ctxt2.fillRect(0, 0, 500, 500);

    var numCols = 20;
    var numRows = 20;

    setInterval(function() {
        ctxt0.fillStyle = 'rgb(0, 0, 0)';
        ctxt0.fillRect(0, 0, 1000, 1000);

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
                var avg = parseInt(vals[1]);
                var p90 = vals[2];

                var col = Math.floor(cellIdx/numCols);
                var row = (cellIdx % numRows);

                var rightColor = Math.max(0, Math.min(255, avg));
                var rightColorHex = '00' + rightColor.toString(16);
                rightColorHex = rightColorHex.substr(-2);

                ctxt1.fillStyle = '#' + rightColorHex + rightColorHex + rightColorHex;
                ctxt1.fillRect(row*(500 / numRows), col*(500 / numCols), 500 / numRows, 500 / numCols);

                var style = ctxt0.fillStyle.substr(0, 3) + rightColorHex + ctxt0.fillStyle.substr(5, 7);
                ctxt0.fillStyle = style;
                ctxt0.fillRect(row*(1000 / numRows), col*(1000 / numCols), 1000 / numRows, 1000 / numCols);
            });
        });

        $.getJSON('/compare', function(data) {
            console.log('compare');
            console.log(data);
            $.each(data, function(k, v) {
                var cellIdx = k;
                var avg = parseInt(v.split(',')[1]);

                var col = Math.floor(cellIdx/numCols);
                var row = (cellIdx % numRows);

                var leftColor = Math.max(0, Math.min(255, avg));
                var leftColorHex = '00' + leftColor.toString(16);
                leftColorHex = leftColorHex.substr(-2);

                ctxt2.fillStyle = '#' + leftColorHex + leftColorHex + leftColorHex;
                ctxt2.fillRect(row*(500 / numRows), col*(500 / numCols), 500 / numRows, 500 / numCols);

                var style = ctxt0.fillStyle.substr(0, 1) + leftColorHex + ctxt0.fillStyle.substr(3, 7);
                ctxt0.fillStyle = style;
                ctxt0.fillRect(row*(1000 / numRows), col*(1000 / numCols), 1000 / numRows, 1000 / numCols);
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
