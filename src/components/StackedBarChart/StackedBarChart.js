import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import Chart from 'chart.js';
import { postData } from '../../api/FetchService';

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
      backgroundColor: '#4169E1',
      borderColor: '#4169E1',
      borderWidth: 2,
      hoverBackgroundColor: '#4169E1',
      hoverBorderColor: '#4169E1',
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'My Second dataset',
      backgroundColor: '#0000CD',
      borderColor: '#0000CD',
      borderWidth: 2,
      hoverBackgroundColor: '#0000CD',
      hoverBorderColor: '#0000CD',
      data: [75, 69, 90, 71, 46, 35, 20]
    },
    {
      label: 'My Second dataset',
      backgroundColor: '#00008B',
      borderColor: '#00008B',
      borderWidth: 2,
      hoverBackgroundColor: '#00008B',
      hoverBorderColor: '#00008B',
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

  componentDidUpdate() {
    let dataToSend = [];

    this.props.selectedStates.forEach(s => {
      let o = { ...this.props.inputValues, stateName: s.label, stateId: s.value };
      dataToSend.push(o);
    });

    // console.log(dataToSend);

    postData(
      data,
      err => {},
      result => {
        // console.log(result);
      }
    );
  }

  render() {
    return (
      <div className="alignForm1" style={this.props.style}>
        {this.props.selectedStates.map(s => (
          <p key={s.label}>
            {s.label} - {s.value}
          </p>
        ))}
        <header className="heading">Data in the form of StackedBarChart:</header>
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
