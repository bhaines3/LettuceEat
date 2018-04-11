import React from 'react';
// //map with marker;
 import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

 const MyMapComponent =withScriptjs(withGoogleMap((props) =>

   <GoogleMap
     defaultZoom={8}
     defaultCenter={{ lat: 32.2226, lng: -110.9747 }}>
     {props.isMarkerShown && <Marker position={{ lat: 32.2226, lng: -110.9747}}/>}
   </GoogleMap>
 ))
export default MyMapComponent;


