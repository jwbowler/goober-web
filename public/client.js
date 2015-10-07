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

    // $('td').click(function() {
        // var cell = this.className;

        // var content = 'Zone: ' + cell;
        // $('#detail').text(content)
    // });

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
        // ctxt0.fillStyle = 'rgb(0, 0, 0)';
        // ctxt0.fillRect(0, 0, 1000, 1000);

        // ctxt1.fillStyle = 'rgb(0, 0, 0)';
        // ctxt1.fillRect(0, 0, 500, 500);

        // ctxt2.fillStyle = 'rgb(0, 0, 0)';
        // ctxt2.fillRect(0, 0, 500, 500);

        $.getJSON('/viz_data', function(data) {
            console.log(data);

            if (data['current'] == null || data['compare'] == null) {
                return;
            }

            for (var cellIdx = 0; cellIdx < 20*20; cellIdx++) {
                var col = Math.floor(cellIdx/numCols);
                var row = (cellIdx % numRows);

                var leftColorHex = '00'

                if (cellIdx.toString() in data['current']) {
                    var vals = data['current'][cellIdx.toString()].split(',');
                    var count = vals[0];
                    var avg = parseInt(vals[1]);
                    var p90 = vals[2];

                    var col = Math.floor(cellIdx/numCols);
                    var row = (cellIdx % numRows);

                    var leftColor = Math.max(0, Math.min(255, avg));
                    leftColorHex = '00' + leftColor.toString(16);
                    leftColorHex = leftColorHex.substr(-2);
                }

                var rightColorHex = '00'

                if (cellIdx.toString() in data['compare']) {
                    var vals = data['compare'][cellIdx.toString()].split(',');
                    var count = vals[0];
                    var avg = parseInt(vals[1]);
                    var p90 = vals[2];

                    var col = Math.floor(cellIdx/numCols);
                    var row = (cellIdx % numRows);

                    // If you're reading this, the "/60" is because I made a
                    // math mistake somewhere and I can't track it down before
                    // the demo. (Sorry...)
                    var rightColor = Math.max(0, Math.min(255, avg/60));
                    rightColorHex = '00' + rightColor.toString(16);
                    rightColorHex = rightColorHex.substr(-2);
                }

                ctxt0.fillStyle = '#' + rightColorHex + leftColorHex + '00';
                ctxt1.fillStyle = '#' + leftColorHex + leftColorHex + leftColorHex;
                ctxt2.fillStyle = '#' + rightColorHex + rightColorHex + rightColorHex;

                ctxt0.fillRect(row*(1000 / numRows), col*(1000 / numCols), 1000 / numRows, 1000 / numCols);
                ctxt1.fillRect(row*(500 / numRows), col*(500 / numCols), 500 / numRows, 500 / numCols);
                ctxt2.fillRect(row*(500 / numRows), col*(500 / numCols), 500 / numRows, 500 / numCols);
            }
        });
    }, 1000);
});
