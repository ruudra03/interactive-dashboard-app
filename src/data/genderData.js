const doughnutChartData = {
    type: "doughnut",
    data: {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Number of employee(s)",
                data: [5, 8]
            }
        ],
        hoverOffset: 4
    },
    options: {
        animation: {
            animateRotate: true
        },
        responsive: true,
        lineTension: 1,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        padding: 25
                    }
                }
            ]
        }
    }
}

const genderData = {
    doughnutChartData
}

export default genderData