import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import StackedBarChart from './components/StackedBarChart/StackedBarChart';
import MyMap from './components/MyMap/MyMap';
import { getData, getDataDefault, getSomeRandomData, postData } from './api/FetchService';

const defaultValues = {
  groupMembers: 400000,
  individualMembers: 300000,
  medicareMembers: 500000,
  medicaidMembers: 200000
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: { ...defaultValues },
      selectedStates: [{ label: 'Michigan', value: 26 }],
      inputValues: { ...defaultValues }
    };
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
        {/* {this.state.selectedStates.map(s => (
          <p key={s.label}>
            {s.label} - {s.value}
          </p>
        ))} */}
        {/* <p>{this.state.input}</p> */}

        <Header />
        <Dashboard callback={this.handleCallback} inputValues={this.state.inputValues} />
        <div>
          <StackedBarChart
            style={this.chartStyle}
            selectedStates={this.state.selectedStates}
            inputValues={this.state.input}
          />
          <MyMap style={this.mapStyle} selectedStates={this.state.selectedStates} />
        </div>
      </div>
    );
  }
}

export default App;
