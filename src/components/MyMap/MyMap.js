import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import statesData from './us-states';

// light to dark
const colors = ['#C3E0F0', '#699AC3', '#2C5985'];

class MyMap extends Component {
  mapboxAccessToken = 'pk.eyJ1Ijoicm9oaXRtYXBzIiwiYSI6ImNqbXl6c3VrbjBiN2czd255czYzdjltZ2gifQ.VQZUgdusFb5E4QMhaw4XIA';
  tileUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapboxAccessToken;
  usaStatesBorders = statesData;

  constructor(props) {
    super(props);
    this.state = {
      lat: 37.8,
      lng: -96,
      zoom: 4,
      selectedStates: props.selectedStates,
      color: {}
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedStates !== this.state.selectedStates) {
      this.setState({ selectedStates: nextProps.selectedStates });
    }
  }

  highlightFeature = e => {
    var layer = e.target;

    layer.setStyle({
      weight: 1,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  };

  // reset default style on mouseOut
  resetHighlight = (component, e) => {
    // Just to show the ref is there during the event, i'm not sure how to specifically use it with your library
    // console.log(component.refnpms.geojson);
    this.refs.geojson.leafletElement.resetStyle(e.target);
    // how to encapsulate GeoJson component/object?
  };

  // `component` is now the first argument, since it's passed through the Function.bind method, we'll need to pass it through here to the relevant handlers
  onEachFeature = (component, feature, layer) => {
    layer.on({
      mouseover: this.highlightFeature.bind(this),
      mouseout: this.resetHighlight.bind(null, component)
    });
  };

  getColor = d => {
    return d > 1000
      ? '#800026'
      : d > 500
        ? '#BD0026'
        : d > 200
          ? '#E31A1C'
          : d > 100
            ? '#FC4E2A'
            : d > 50
              ? '#FD8D3C'
              : d > 20
                ? '#FEB24C'
                : d > 10
                  ? '#FED976'
                  : '#FFEDA0';
  };

  getFillOpacity = id => {
    const { selectedStates } = this.state;
    if (this._isPresent(id, selectedStates)) {
      return 1.0;
    }
    return 0.0;
  };

  _isPresent = (id, selectedStates) => {
    for (let i = 0; i < selectedStates.length; i++) {
      if (id === selectedStates[i].value) {
        return true;
      }
    }
    return false;
  };

  getColorShade = (id, density) => {
    const { selectedStates } = this.state;
    const features = statesData.features;
    console.log(features);

    if (this._isPresent(id, selectedStates)) {
      // we have id and density. sort based on density

      return colors[2];
    }
  };

  geoJsonStyle = feature => {
    return {
      stroke: false,
      // fillColor: this.getColor(feature.properties.density),
      fillColor: this.getColorShade(parseInt(feature.id), feature.properties.density),

      weight: 1,

      // color: this.getColorShade(feature.properties.density),

      // fillColor: '#C3E0F0',
      fillOpacity: this.getFillOpacity(parseInt(feature.id))
    };
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="alignForm1">
        {/* {this.state.selectedStates.map(s => (
          <p key={s.label}>
            {s.label} - {s.value}
          </p>
        ))} */}

        <header className="heading">Data in the form of Maps:</header>

        <Map style={this.props.style} center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url={this.tileUrl}
            id="mapbox.light"
          />
          <GeoJSON
            data={this.usaStatesBorders}
            onEachFeature={this.onEachFeature.bind(null, this)}
            ref="geojson"
            style={this.geoJsonStyle}
          />
        </Map>
      </div>
    );
  }
}

export default MyMap;
