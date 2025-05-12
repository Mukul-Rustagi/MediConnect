// src/MapComponent.js
import React, { useEffect } from "react";
// import 'ol/ol.css';
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Style, Fill, Stroke, Circle as CircleStyle } from "ol/style";

const MapComponent = ({ hospitalData, selectedState }) => {
  useEffect(() => {
    // Initialize map
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([77.209, 28.6139]), // Center on India
        zoom: 5,
      }),
    });

    // Clear previous features
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);

    // Filter hospitals by selected state
    const filteredData = selectedState
      ? hospitalData.filter((hospital) => hospital.state === selectedState)
      : [];

    // Add hospital markers to the map
    filteredData.forEach((hospital) => {
      const coordinates = fromLonLat([hospital.longitude, hospital.latitude]);
      const feature = new Feature(new Point(coordinates));
      feature.setProperties({ name: hospital.name });

      // Style for the hospital markers
      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: "red" }),
            stroke: new Stroke({ color: "white", width: 2 }),
          }),
        })
      );

      vectorSource.addFeature(feature);
    });

    // Adjust view to fit all markers if a state is selected
    if (filteredData.length > 0) {
      const extent = vectorSource.getExtent();
      map.getView().fit(extent, { padding: [20, 20, 20, 20], maxZoom: 12 });
    }

    return () => {
      map.setTarget(undefined); // Cleanup on unmount
    };
  }, [hospitalData, selectedState]);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;