import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import StackedBarChart from './components/StackedBarChart/StackedBarChart';
import MyMap from './components/MyMap/MyMap';

class App extends Component {
  chartStyle = {
    width: '500px',
    height: '800px',
    float: 'left'
    // display: 'none'
  };

  mapStyle = {
    // margin: '100px auto',
    width: '500px',
    height: '400px'
  };

  divStyle = {
    maxWidth: '1400px',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '800px',
    border: '3px solid green'
  };

  render() {
    return (
      <div>
        <Header />
        <Dashboard />
        <div>
          <StackedBarChart />
          <MyMap style={this.mapStyle} />
        </div>
      </div>
    );
  }
}

export default App;
