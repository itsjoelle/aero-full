// export function degreesToRadians(degrees) {
//     return degrees * (Math.PI / 180);
//   }

//   function calculateBearing2(lat1, lon1, lat2, lon2) {
//     const φ1 = degreesToRadians(lat1);
//     const φ2 = degreesToRadians(lat2);
//     const Δλ = degreesToRadians(lon2 - lon1);

//     const y = Math.sin(Δλ) * Math.cos(φ2);
//     const x =
//       Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

//     const θ = Math.atan2(y, x);
//     return ((θ * 180) / Math.PI + 360) % 360; // Convert to degrees and normalize
//   }

//   const bearing = calculateBearing2(
//     data.departureLatitude,
//     data.departureLongitude,
//     data.destinationLatitude,
//     data.destinationLongitude
//   );

//   console.log(data.direction + 'bearing ' + bearing);

//   function calculateBearing();
