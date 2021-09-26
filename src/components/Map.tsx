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

// interface MapProps {
//   center: [number, number];
//   zoom: number | 5;
// }
type Props = {
  center: [number, number],
  zoom: number | 5
}

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
      map.addSource('arikawa', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [-67.13734, 45.13745],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
                [-69.06, 43.98],
                [-70.11617, 43.68405],
                [-70.64573, 43.09008],
                [-70.75102, 43.08003],
                [-70.79761, 43.21973],
                [-70.98176, 43.36789],
                [-70.94416, 43.46633],
                [-71.08482, 45.30524],
                [-70.66002, 45.46022],
                [-70.30495, 45.91479],
                [-70.00014, 46.69317],
                [-69.23708, 47.44777],
                [-68.90478, 47.18479],
                [-68.2343, 47.35462],
                [-67.79035, 47.06624],
                [-67.79141, 45.70258],
                [-67.13734, 45.13745]
              ]
            ]
          }
        }
      });
      map.addLayer({
        'id': 'arikawa',
        'type': 'fill',
        'source': 'arikawa',
        'layout': {},
        'paint': {
          'fill-color': '#FF80ff',
          'fill-opacity': 0.5
        }
      });
      // map.addLayer({
      //   'id': 'outline',
      //   'type': 'line',
      //   'source': 'arikawa',
      //   'layout': {},
      //   'paint': {
      //     'line-color': '#000',
      //     'line-width': 3
      //   }
      // });
    });

    // mapboxgl.Mapのインスタンスへの参照を保存(未使用)
    setMapInstance(map);
  }, []);
  return <div style={styles} ref={mapContainer} />;
};

export default Map;
