import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import StackedBarChart from './components/StackedBarChart/StackedBarChart';
import MyMap from './components/MyMap/MyMap';

class App extends Component {
  state = { input: {} };

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

  formChild1 = (name, value) => {
    this.setState({
      input: { ...this.state.input, [name]: value }
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Dashboard callback={this.formChild1} />
        <div>
          <StackedBarChart style={this.chartStyle} />
          <MyMap style={this.mapStyle} data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
