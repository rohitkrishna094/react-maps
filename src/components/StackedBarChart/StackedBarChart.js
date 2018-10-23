import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import Chart from 'chart.js';
import { postData } from '../../api/FetchService';
import { threeColors as colors } from '../../assets/colors.js';

class StackedBarChart extends Component {
  barOptions_stacked = {
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
      display: false
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
          this.data.datasets.forEach((dataset, i) => {
            var meta = chartInstance.controller.getDatasetMeta(i);
            Chart.helpers.each(
              meta.data.forEach((bar, index) => {
                this.chartData = dataset.data[index];
                if (i === 0) {
                  ctx.fillText(this.chartData, 50, bar._model.y + 4);
                } else {
                  ctx.fillText(this.chartData, bar._model.x - 25, bar._model.y + 4);
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

  chartData = {
    labels: [
      'All Other Combinations',
      'Group, Group',
      'Group, Individual',
      'Group, Medicaid',
      'Group, Medicare',
      'Individual, Group',
      'Individual, Medicaid',
      'Individual, Medicare',
      'Medicaid, Group',
      'Medicaid, Individual',
      'Medicaid, Medicare',
      'Medicare, Group',
      'Medicare, Individual',
      'Medicare, Medicaid'
    ],
    datasets: [
      {
        backgroundColor: colors[0],
        // borderColor: '#4169E1',
        // borderWidth: 2,
        hoverBackgroundColor: '#5169E1',
        hoverBorderColor: '#4169E1',
        data: [65, 59, 80, 81, 56, 55, 9]
      }
    ]
  };

  setChart = result => {
    this.chartData.datasets = [];
    for (let i = 0; i < result.length; i++) {
      let combination = result[i].output.combinations.map(c => c.amount);

      const temp = {
        label: `My ${i + 1}th dataset`,
        backgroundColor: colors[i],
        hoverBackgroundColor: '#5169E1',
        hoverBorderColor: '#4169E1',
        data: [...combination]
      };
      this.chartData.datasets.push(temp);
    } // end for
    this.setState({
      data: { ...this.state.data, datasets: this.chartData.datasets }
    });
    // console.log(this.chartData.datasets);
  };

  constructor(props) {
    super(props);
    this.state = { data: { datasets: this.chartData.datasets, labels: this.chartData.labels } };
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    let dataToSend = [];

    nextProps.selectedStates.forEach(s => {
      let o = { ...this.props.inputValues, stateName: s.label, stateId: s.value };
      dataToSend.push(o);
    });
    console.log(dataToSend);
    postData(
      dataToSend,
      err => {},
      result => {
        this.setChart(result);
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
          options={this.barOptions_stacked}
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
