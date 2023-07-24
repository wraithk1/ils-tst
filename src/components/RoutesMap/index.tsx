import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'

import Routing from '../RouterMachine'

import { useSelector } from 'react-redux'
import { getPolyline } from '../../store/slice'

import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

let DefaultIcon = L.icon({
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
})
L.Marker.prototype.options.icon = DefaultIcon

function RoutesMap() {
  const [map, setMap] = useState<L.Map>({} as L.Map)  
  const polyline = useSelector(getPolyline)

  React.useEffect(() => {
    if (polyline?.waypoints?.length > 0) {
      map.fitBounds(polyline.waypoints.map((way) => [way.location[0], way.location[1]]))
    }

    console.log('OSRM polyline', polyline)
  }, [map, polyline])

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: '800px', height: '800px' }}
      ref={(map: L.Map) => setMap(map)}
    >
      <Routing />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
  )
}

export default RoutesMap
