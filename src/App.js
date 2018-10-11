import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import StackedBarChart from './components/StackedBarChart/StackedBarChart';
import MyMap from './components/MyMap/MyMap';
import { getData, getDataDefault, getSomeRandomData } from './api/FetchService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      selectedStates: [{ label: 'Michigan', value: '26' }],
      inputValues: {
        groupMembers: 400000,
        individualMembers: 300000,
        medicareMembers: 500000,
        medicaidMembers: 200000
      }
    };

    getSomeRandomData(
      err => {},
      data => {
        console.log(data);
      }
    );
  }

  chartStyle = {
    width: '800px',
    height: '1500px',
    float: 'left'
    // display: 'none'
  };

  mapStyle = {
    // margin: '100px auto',
    width: '700px',
    height: '400px'
  };

  divStyle = {
    maxWidth: '1400px',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '800px',
    border: '3px solid green'
  };

  handleCallback = (name, value) => {
    if (name === 'input') {
      this.setState({
        input: { ...this.state.input, ...value }
      });
    } else if (name === 'states') {
      this.setState({
        selectedStates: [...value]
      });
    }
  };

  render() {
    return (
      <div>
        <Header />
        <Dashboard callback={this.handleCallback} inputValues={this.state.inputValues} />
        <div>
          <StackedBarChart style={this.chartStyle} />
          <MyMap style={this.mapStyle} selectedStates={this.state.selectedStates} />
        </div>
      </div>
    );
  }
}

export default App;
