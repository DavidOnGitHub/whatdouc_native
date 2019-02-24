const regionToPolygon = (region) => {
  const { latitude: centerLat, longitude: centerLng, latitudeDelta, longitudeDelta } = region;
  const northWest = [centerLng - longitudeDelta / 2, centerLat + latitudeDelta / 2];
  const northEast = [centerLng + longitudeDelta / 2, centerLat + latitudeDelta / 2];
  const southEast = [centerLng + longitudeDelta / 2, centerLat - latitudeDelta / 2];
  const southWest = [centerLng - longitudeDelta / 2, centerLat - latitudeDelta / 2];

  return [[northWest, northEast, southEast, southWest, northWest]];
};

export {
  regionToPolygon
};
