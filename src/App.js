import { Fragment, useState, useRef, useEffect } from 'react';
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as turf from '@turf/turf'
import db from './firebase';
import { app } from './firebase';

function App() {
  const mapRef = useRef(null);

  function initMapboxGLJS() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpbWlyemF5ZWYiLCJhIjoiY2w4Y25vYTk5MG5kczNvcGN3NnhwZnJyNSJ9.usDar3ctZeObYcy5jes_4w';

    const map = new mapboxgl.Map({
      container: 'map',
      projection: 'globe',
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [49.860, 40.370],
      zoom: 12.5
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })
    );

    const marker1 = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([49.870, 40.38770])
      .addTo(map);

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: 'draw_polygon'
    });

    map.addControl(draw);

    map.on('draw.create', updateArea);
    map.on('draw.delete', updateArea);
    map.on('draw.update', updateArea);

    function updateArea(e) {
      const data = draw.getAll();
      const answer = document.getElementById('calculated-area');
      if (data.features.length > 0) {
        const area = turf.area(data);
        // Restrict the area to 2 decimal points.
        const rounded_area = Math.round(area * 100) / 100;
        answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
      } else {
        answer.innerHTML = '';
        if (e.type !== 'draw.delete')
          alert('Click the map to draw a polygon.');
      }
    }
  }

  useEffect(() => {
    initMapboxGLJS()
  }, [mapRef])

  return (
    <>
      <div ref={mapRef} id='map'>
      </div>
      <div class="calculation-box">
        <p>Click the map to draw a polygon.</p>
        <div id="calculated-area"></div>
      </div>
    </>
  );
}

export default App;
