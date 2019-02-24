export const facebookAppId = 'XXXXX';
export const awesomeNicknames = [
  'superhelper', 'agoodguy'
];
export const getRandomNickname = () => awesomeNicknames[Math.floor(Math.random() * awesomeNicknames.length)];

export const initialRegion = {
  latitude: -33.878111,
  longitude: 151.221134,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2
};

export const consolidateThreshold = {
  longitude: 0.03,
  latitude: 0.03
};
