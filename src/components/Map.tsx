import React, { ReactElement, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const getApiKey = ():string => {
  const MAPBOX_APIKEY = process.env.NEXT_PUBLIC_MAPBOX_APIKEY;
  if (!MAPBOX_APIKEY) {
    throw new Error("URLが環境変数からセットされていません");
  }
  return MAPBOX_APIKEY;
};

mapboxgl.accessToken = getApiKey() || "";

type Props = {
  center: [number, number],
  zoom: number | 5
};

const Map: React.FC<Props> = ({ center, zoom }) => {
  // mapboxgl.Mapのインスタンスへの参照を保存するためのuseState
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map>();

  // 地図表示するDiv要素を特定するためのuseRef
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const styles: React.CSSProperties = {
    height: "100%",
    width: "100%",
  };
  useEffect(() => {
    // mapContainer.currentはnullになり得るので型ガード（ていねい）
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/redwoodfusion/cktn61woa3luf18p1f7916x2m",
      center: center,
      zoom: zoom,
    });

    map.on('load', () => {
      map.addSource('shop_points', {
        'type': 'geojson',
        'data': '/geojson/21_shinkamigoto-shop.geojson'
      });

      // Add a layer to use the image to represent the data.
      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'shop_points', // reference the data source
        'layout': {
          'icon-image': 'restaurant-15', // reference the image
          'icon-allow-overlap': true
        }
      });
    });
    map.on('click', 'points', (e:any) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'points', () => {
      console.log("enter");
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'points', () => {
      console.log("leave");
      map.getCanvas().style.cursor = '';
    });

    // mapboxgl.Mapのインスタンスへの参照を保存(未使用)
    setMapInstance(map);
  }, []);
  return <div style={styles} ref={mapContainer} />;
};

export default Map;
