import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MyMap from './components/MyMap';

class App extends Component {
  render() {
    return <MyMap />;
  }
}

export default App;
