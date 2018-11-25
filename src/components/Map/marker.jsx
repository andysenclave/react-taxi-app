import React from 'react';
import { Marker } from 'google-maps-react';
import { pin } from '../../assets/icons';


const CustomMarker = props => (
  <Marker
    {...props}
    name={props.name}
    position={props.coordinate}
    icon={{
      url: props.icon || pin,
      anchor: new props.google.maps.Point(32,32),
      scaledSize: new props.google.maps.Size(props.size || 32, props.size || 32)
    }}
  />
);

export default CustomMarker;