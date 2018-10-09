import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import statesData from './us-states';

class MyMap extends Component {
  mapboxAccessToken = 'pk.eyJ1Ijoicm9oaXRtYXBzIiwiYSI6ImNqbXl6c3VrbjBiN2czd255czYzdjltZ2gifQ.VQZUgdusFb5E4QMhaw4XIA';
  tileUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapboxAccessToken;
  usaStatesBorders = statesData;

  state = {
    lat: 37.8,
    lng: -96,
    zoom: 4
  };

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

  geoJsonStyle = feature => {
    return {
      stroke: false,
      weight: 1,
      fillOpacity: 0.0
    };
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map style={this.props.style} center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url={this.tileUrl}
          id="mapbox.light"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <GeoJSON
          data={this.usaStatesBorders}
          onEachFeature={this.onEachFeature.bind(null, this)}
          ref="geojson"
          style={this.geoJsonStyle}
        />
      </Map>
    );
  }
}

export default MyMap;
