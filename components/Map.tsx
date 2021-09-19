import React, { useState, useEffect } from "react";
import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

interface MapProps {
  center: [number, number];
  zoom: number | 5;
}

const Map = ({ center, zoom }: MapProps) => {
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

  return <div id="map" style={styles}></div>;
};

export default Map;
