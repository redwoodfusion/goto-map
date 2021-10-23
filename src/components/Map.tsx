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

    // map.on('click', 'places', (e) => {
    //   const markerHeight = 50;
    //   const markerRadius = 10;
    //   const linearOffset = 25;
    //   const popupOffsets = {
    //     'top': [0, 0],
    //     'top-left': [0, 0],
    //     'top-right': [0, 0],
    //     'bottom': [0, -markerHeight],
    //     'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    //     'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    //     'left': [markerRadius, (markerHeight - markerRadius) * -1],
    //     'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    //   };
    //   const popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
    //     .setLngLat(e.lngLat)
    //     .setHTML("<h1>Hello World!</h1>")
    //     .setMaxWidth("300px")
    //     .addTo(map);
    // });
    // map.on('load', () => {
    //   map.addControl(new mapboxgl.NavigationControl());
    //   map.loadImage(
    //     '/icon/church_yellow.png',
    //     (error, image) => {
    //       if (error) throw error;

    //       // Add the image to the map style.
    //       map.addImage('church', image);
    //       // Add a data source containing one point feature.
    //       map.addSource('point', {
    //         'type': 'geojson',
    //         'data': '/geojson/20_shinkamigoto-church.geojson'
    //       });

    //       // Add a layer to use the image to represent the data.
    //       map.addLayer({
    //         'id': 'points',
    //         'type': 'symbol',
    //         'source': 'point', // reference the data source
    //         'layout': {
    //           'icon-image': 'church', // reference the image
    //           'icon-size': 0.5
    //         }
    //       });
    //     }
    //   );
    // });
    map.on('mousedown', function () {
      console.log('マウスクリック済');
    });

    // mapboxgl.Mapのインスタンスへの参照を保存(未使用)
    setMapInstance(map);
  }, []);
  return <div style={styles} ref={mapContainer} />;
};

export default Map;
