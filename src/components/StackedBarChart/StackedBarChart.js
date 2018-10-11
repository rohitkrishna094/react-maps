import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import Chart from 'chart.js';

const barOptions_stacked = {
  tooltips: {
    enabled: true
  },
  hover: {
    animationDuration: 0
  },
  scales: {
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontFamily: "'Open Sans Bold', sans-serif",
          fontSize: 12
        },
        scaleLabel: {
          display: false
        },
        gridLines: {},
        stacked: true
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
          color: '#fff',
          zeroLineColor: '#fff',
          zeroLineWidth: 0
        },
        ticks: {
          fontFamily: "'Open Sans Bold', sans-serif",
          fontSize: 12
          //  minRotation: 30
        },
        stacked: true
      }
    ]
  },
  legend: {
    display: true
    //position: 'right'
  },
  animation: {
    onComplete: function() {
      var chartInstance = this.chart;
      var ctx = chartInstance.ctx;
      ctx.textAlign = 'left';
      ctx.font = '9px Open Sans';
      ctx.fillStyle = '#000';

      Chart.helpers.each(
        this.data.datasets.forEach(function(dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          Chart.helpers.each(
            meta.data.forEach(function(bar, index) {
              data = dataset.data[index];
              if (i === 0) {
                ctx.fillText(data, 50, bar._model.y + 4);
              } else {
                ctx.fillText(data, bar._model.x - 25, bar._model.y + 4);
              }
            }),
            this
          );
        }),
        this
      );
    }
  },
  pointLabelFontFamily: 'Quadon Extra Bold',
  scaleFontFamily: 'Quadon Extra Bold'
};

let data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [75, 69, 90, 71, 46, 35, 20]
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [45, 39, 40, 51, 76, 25, 10]
    }
  ]
};

class StackedBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { datasets: data.datasets, labels: data.labels } };
  }

  getDatasetAtEventCustom = event => {
    console.log(' getDatasetAtEventCustom event - ' + event);
  };

  getElementAtEventCustom = even => {
    console.log(' getElementAtEventCustom event - ' + even);
  };

  getElementsAtEventCustom = eve => {
    console.log(' getElementsAtEventCustom event - ' + eve);
  };

  onElementsClickCustom = ev => {
    console.log(' onElementsClickCustom event - ' + ev);
  };

  render() {
    return (
      <div style={this.props.style}>
        <HorizontalBar
          data={this.state.data}
          options={barOptions_stacked}
          getDatasetAtEvent={this.getDatasetAtEventCustom}
          getElementAtEvent={this.getElementAtEventCustom}
          getElementsAtEvent={this.getElementsAtEventCustom}
          onElementsClick={this.onElementsClickCustom}
        />
      </div>
    );
  }
}
export default StackedBarChart;
