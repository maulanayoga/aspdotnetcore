$(function () {
    $.ajax({
        type: 'GET',
        url: "https://localhost:7181/api/Chart",
        dataType: 'json',
        dataSrc: 'data',
        success: function (response) {
            var departmentName = response.data.map(function (item) {
                return item.departmentName;
            });

            var employeeCount = response.data.map(function (item) {
                return item.employeeCount;
            });

            var employeeActive = response.data.map(function (item) {
                return item.statusActive;
            });

            var employeeResign = response.data.map(function (item) {
                return item.employeeCount-item.statusActive;
            });

            var areaChartData = {
                labels: departmentName,
                datasets: [
                    {
                        label: 'Active',
                        backgroundColor: 'rgba(60,141,188,1)',
                        borderColor: 'rgba(60,141,188,1)',
                        pointRadius: false,
                        pointColor: '#3b8bba',
                        pointStrokeColor: 'rgba(60,141,188,1)',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(60,141,188,1)',
                        data: employeeActive
                    },
                    {
                        label: 'Resign',
                        backgroundColor: 'rgba(60,141,188,0.5)',
                        borderColor: 'rgba(60,141,188,0.5)',
                        pointRadius: false,
                        pointColor: '#3b8bba',
                        pointStrokeColor: 'rgba(60,141,188,0.5)',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(60,141,188,0.5)',
                        data: employeeResign
                    }
                ],
            }

            var barChartCanvas = $('#barChart').get(0).getContext('2d')

            var barChartData = $.extend(true, {}, areaChartData)
            var temp0 = areaChartData.datasets[0]
            barChartData.datasets[0] = temp0

            var barChartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                datasetFill: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero : true,
                        }
                    }]
                }
            }

            new Chart(barChartCanvas, {
                type: 'bar',
                data: barChartData,
                options: barChartOptions
            })

            //const colors = [];

            //for (let i = 0; i < departmentName.lenght; i++) {
            //    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            //    colors.push(randomColor);
            //}

            var donutChartCanvas = $('#donutChart').get(0).getContext('2d')
            var donutData = {
                labels: departmentName,
                datasets: [
                    {
                        backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
                        data: employeeCount,
                    }
                ]
            }
            var donutOptions = {
                maintainAspectRatio: false,
                responsive: true,
            }
            new Chart(donutChartCanvas, {
                type: 'doughnut',
                data: donutData,
                options: donutOptions
            })

        },
    })



})