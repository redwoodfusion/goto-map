import React, { useState, useEffect, ReactElement } from "react";
import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const getApiKey = ():string => {
  const MAPBOX_APIKEY = process.env.NEXT_PUBLIC_MAPBOX_APIKEY;
  if (!MAPBOX_APIKEY) {
    throw new Error("URLが環境変数からセットされていません");
  }
  return MAPBOX_APIKEY;
};

mapbox.accessToken = getApiKey() || "";

interface MapProps {
  center: [number, number];
  zoom: number | 5;
}

const Map = ({ center, zoom }: MapProps):ReactElement => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [map, setMap] = useState<mapbox.Map | null>(null);
  const styles: React.CSSProperties = {
    height: "100%",
    width: "100%",
  };

  const options: mapbox.MapboxOptions = {
    container: "map",
    style: "mapbox://styles/redwoodfusion/cktn61woa3luf18p1f7916x2m",
    center: center,
    zoom: zoom,
  };

  useEffect(() => {
    setMounted(true);
    setMap(new mapbox.Map(options));
  }, [mounted]);

  useEffect(() => {
    if (mounted && map) {
      map.setCenter(center);
    }
  }, [center]);

  return (
    <div id="map" style={styles}>
      <style jsx>{`
        .Home_container__1EcsU {
          padding: 0;
          width: 100%;
        }
        .mapboxgl-canvas {
          width: 100% !important;
        }
      `}
      </style>
    </div>
  );
};

export default Map;
