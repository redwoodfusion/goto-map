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
        'data': '/geojson/00_shinkamigoto.geojson'
      })
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
