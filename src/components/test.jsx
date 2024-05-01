import React from 'react';
import { Line } from 'react-chartjs-2';

class LineGraph extends React.Component {
  render() {
    const data = {
      labels: [0, 200,400,600,800,1000,1500], // Reverse order of labels
      datasets: [
        {
          label: 'Inlet Temp',
          data: [55, 50, 40, 35, 25, 20,30,35], // Sample temperature data
          backgroundColor: 'rgb(53, 162, 235)',
          borderColor: 'rgba(53, 162, 235, 0.5)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        xAxes: [
          {
            type: 'linear', // Use linear scale for x-axis
            position: 'bottom',
            ticks: {
              reverse: true, // Reverse x-axis
            },
          },
        ],
      },
    };

    return <Line data={data} options={options} />;
  }
}

export default LineGraph;
