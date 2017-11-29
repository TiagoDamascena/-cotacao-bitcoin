var init = function () {
    var start = moment().subtract(1, 'months').format('YYYY-MM-DD');
    var end = moment().format('YYYY-MM-DD');

    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = JSON.parse(this.response);
            var labels =[];
            var values = [];

            for(var day in response.bpi) {

                if (!response.bpi.hasOwnProperty(day)) {
                    continue;
                }

                labels.push(moment(day).format('DD/MM/YYYY'));
                values.push(response.bpi[day]);
            }

            createChart(labels, values);
        }
    };
    xhttp.open(
        'GET',
        'https://api.coindesk.com/v1/bpi/historical/close.json?index=USD&currency=BRL&start='+start+'&end='+end,
        true);
    xhttp.send();
};

init();

var createChart = function (labels, values) {

    var div = document.getElementById('chart');

    var chart = new Chart(div, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Bitcoin',
                data: values,
                borderColor: '#6a1b9a',
                backgroundColor: 'transparent',
                pointBorderColor: '#6a1b9a',
                pointBackgroundColor: '#6a1b9a'
            }]
        },
        options: {
            layout: {
                padding: {
                    left: '20',
                    right: '20'
                }
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return 'R$ '+tooltipItem.yLabel;
                    }
                }
            }
        }
    });
};