import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ chartData }) => {
    const labels = [];
    const clicks = [];

    chartData?.forEach(data => {
        if (data.type === 'Button') {
            labels.push(data.name);
            clicks.push(data.clicks)
        }
    })

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'User Clicks',
                data: clicks,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            Hello
            <Bar data={data} options={options} />
        </div>
    )
}

export default Chart
