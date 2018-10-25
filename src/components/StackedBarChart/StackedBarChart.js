import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import Chart from 'chart.js';
import { postData } from '../../api/FetchService';
import { threeColors as colors } from '../../assets/colors.js';

class StackedBarChart extends Component {
  barOptions_stacked = {
    plugins: {
      datalabels: {
        display: false,
        align: 'center',
        anchor: 'center'
      }
    },
    tooltips: {
      enabled: true,
      mode: 'point',
      backgroundColor: 'white',
      titleFontColor: 'black',
      bodyFontColor: 'black',
      footerFontColor: 'black',
      borderColor: 'black',
      borderWidth: 0.5,
      cornerRadius: 1,
      caretSize: 0
    },
    hover: {
      onHover: function(e) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      },
      animationDuration: 100
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
            display: true
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
        // hoverBackgroundColor: '#5169E1',
        hoverBorderWidth: 1,
        hoverBorderColor: '#000000',
        data: [65, 59, 80, 81, 56, 55, 9]
      }
    ]
  };

  setChart = result => {
    this.chartData.datasets = [];
    for (let i = 0; i < result.length; i++) {
      let combination = result[i].output.combinations.map(c => c.amount);
      const index = this.getRankingIndex(result[i].input.stateId);

      const temp = {
        label: result[i].input.stateName,
        backgroundColor: colors[index],
        hoverBorderWidth: 1,
        hoverBorderColor: '#000000',
        data: [...combination]
      };
      this.chartData.datasets.push(temp);
    } // end for
    this.setState({
      data: { ...this.state.data, datasets: this.chartData.datasets }
    });
    // console.log(this.chartData.datasets);
  };

  getRankingIndex(id) {
    const { sortedStates } = this.state;
    for (let i = 0; i < sortedStates.length; i++) {
      if (sortedStates[i].id === id) {
        return i;
      }
    }
    return 0;
  }

  constructor(props) {
    super(props);
    this.state = { data: { datasets: this.chartData.datasets, labels: this.chartData.labels }, sortedStates: [] };
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
    // console.log(dataToSend);
    postData(
      dataToSend,
      err => {},
      result => {
        this.setChart(result);
      }
    );

    this.setState({ sortedStates: nextProps.sortedStates });
  }

  render() {
    return (
      <div className="alignForm1" style={this.props.style}>
        {/* {this.state.sortedStates.map((s, i) => (
          <p key={i}>{JSON.stringify(s)}</p>
        ))} */}

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
