function calcDistance(lat1x, lng1, lat2x, lng2) {
  let R = 6371; // km
  let dLat = toRad(lat2x - lat1x);
  let dLng = toRad(lng2 - lng1);
  let lat1 = toRad(lat1x);
  let lat2 = toRad(lat2x);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d;
}
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

export default calcDistance;
