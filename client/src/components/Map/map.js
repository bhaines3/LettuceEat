import React from 'react';
//map with marker;
 import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

 const MyMapComponent =withScriptjs(withGoogleMap((props) =>
   <GoogleMap
     defaultZoom={8}
     defaultCenter={{ lat: -34.397, lng: 150.644 }}
   >
     {props.isMarkerShown && <Marker {... props.position}/>}
   </GoogleMap>
 ))
export default MyMapComponent;



